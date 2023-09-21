import { Injectable } from '@angular/core'
import {
    Asset,
    AssetFile,
    CreateClientParams,
    DeletedAsset,
    DeletedEntry,
    Entry,
    EntrySkeletonType,
    FieldsType,
    SyncCollection,
    createClient,
} from 'contentful'
import { StorageService } from './storage.service'
import {
    Observable,
    defaultIfEmpty,
    forkJoin,
    from,
    map,
    switchMap,
    take,
} from 'rxjs'
import { isNil, isEmpty } from 'rambda'
import {
    IContentfulEntry,
    IContentfulEnvs,
    ISyncCollection,
} from './contentful'
import { HttpClient } from '@angular/common/http'
import { blobToString } from './util'
import { Store } from '@ngrx/store'
import { ISettingsState, settingsFeature } from '../settings/settings.reducer'

const PROD_CONFIG: CreateClientParams = {
    space: 'v00lofp5qjmx',
    accessToken: '4Av2evmSsl_ZqurMdfVdX0RQry3fQGihm3h7JAa4nXI',
}

const PREVIEW_CONFIG: CreateClientParams = {
    space: 'v00lofp5qjmx',
    accessToken: 'kje-KuyQeFghMLLUVot_f6tClX-mv717r6GCYj34VRU',
    host: 'preview.contentful.com',
}

@Injectable({
    providedIn: 'root',
})
export class SyncService {
    constructor(
        private storage: StorageService,
        private http: HttpClient,
        private settingsStore: Store<ISettingsState>,
    ) {}

    checkForUpdate(nextSyncToken: string | null): Observable<ISyncCollection> {
        return this.settingsStore
            .select(settingsFeature.selectContentfulEnv)
            .pipe(
                take(1),
                map((env) =>
                    env === IContentfulEnvs.production
                        ? PROD_CONFIG
                        : PREVIEW_CONFIG,
                ),
                switchMap((config) =>
                    from(
                        createClient(config).withoutLinkResolution.sync<
                            EntrySkeletonType<{}>,
                            'WITHOUT_LINK_RESOLUTION'
                        >({
                            ...(isNil(nextSyncToken)
                                ? { initial: true }
                                : { nextSyncToken }),
                        }),
                    ),
                ),
            )
    }

    hasChange(collection: ISyncCollection) {
        return !(
            isEmpty(collection.assets) &&
            isEmpty(collection.entries) &&
            isEmpty(collection.deletedEntries) &&
            isEmpty(collection.deletedAssets)
        )
    }

    private getEntryFields<T extends FieldsType>(
        entry: IContentfulEntry<T>,
    ): T {
        const fieldsWithLocale = entry?.fields ?? {}
        return Object.entries(fieldsWithLocale).reduce((acc, [key, value]) => {
            acc[key] = value.hasOwnProperty('en-US') ? value['en-US'] : value

            return acc
        }, {} as any)
    }

    public getEntry<T extends FieldsType>(
        id: string,
    ): Observable<IContentfulEntry<T>> {
        return this.storage.get(id).pipe(
            map((result) => {
                const entry = JSON.parse(result)
                const fields = this.getEntryFields<T>(entry)
                return { ...entry, fields }
            }),
        )
    }

    public removeDeletedItems(items: (DeletedEntry | DeletedAsset)[]) {
        return forkJoin(
            items.map((item) => this.storage.remove(item.sys.id)),
        ).pipe(defaultIfEmpty([]))
    }

    public storeChangedEntries(entries: ISyncCollection['entries']) {
        return forkJoin(
            entries.map((entry) =>
                this.storage.set(this.getId(entry), JSON.stringify(entry)),
            ),
        ).pipe(defaultIfEmpty([]))
    }

    private storeAsset(asset: Asset, blob: Blob, type: string) {
        return from(blobToString(blob, type)).pipe(
            switchMap((assetString) =>
                this.storage.set(this.getId(asset), assetString),
            ),
        )
    }

    public cacheAssets(assets: ISyncCollection['assets']) {
        return forkJoin(
            assets
                .map((asset) => ({
                    ...asset,
                    file: this.getAssetFile(asset),
                }))
                .map(({ file, ...asset }) =>
                    this.http
                        .get(`https:${file.url}?w=${window.innerWidth}`, {
                            responseType: 'blob',
                        })
                        .pipe(
                            switchMap((blob) =>
                                this.storeAsset(asset, blob, file.contentType),
                            ),
                        ),
                ),
        ).pipe(defaultIfEmpty([]))
    }

    public clearCache() {
        return this.storage.clear()
    }

    private getId(entry: Entry<EntrySkeletonType<{}>> | Asset) {
        return entry.sys.id
    }

    private getAssetFile(
        asset: Asset<'WITHOUT_LINK_RESOLUTION' | 'WITH_ALL_LOCALES', string>,
    ): AssetFile {
        const file = asset.fields.file as any
        return file.hasOwnProperty('en-US') ? file['en-US'] : file
    }
}
