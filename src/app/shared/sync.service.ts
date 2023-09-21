import { Injectable } from '@angular/core'
import {
    Asset,
    AssetFile,
    CreateClientParams,
    DeletedAsset,
    DeletedEntry,
    Entry,
    EntrySkeletonType,
    SyncCollection,
    createClient,
} from 'contentful'
import { StorageService } from './storage.service'
import { Observable, defaultIfEmpty, forkJoin, from, switchMap } from 'rxjs'
import { isNil, isEmpty } from 'rambda'
import { ISyncCollection } from './contentful'
import { HttpClient } from '@angular/common/http'
import { blobToString } from './util'

const CONFIG: CreateClientParams = {
    space: 'v00lofp5qjmx',
    accessToken: '4Av2evmSsl_ZqurMdfVdX0RQry3fQGihm3h7JAa4nXI',
}

@Injectable({
    providedIn: 'root',
})
export class SyncService {
    private client = createClient(CONFIG)

    constructor(private storage: StorageService, private http: HttpClient) {}

    checkForUpdate(nextSyncToken: string | null): Observable<ISyncCollection> {
        return from(
            this.client.withoutLinkResolution.sync<
                EntrySkeletonType<{}>,
                'WITHOUT_LINK_RESOLUTION'
            >({
                ...(isNil(nextSyncToken)
                    ? { initial: true }
                    : { nextSyncToken }),
            }),
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
