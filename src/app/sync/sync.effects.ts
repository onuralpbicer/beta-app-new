import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

import {
    catchError,
    defaultIfEmpty,
    delay,
    map,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators'
import { forkJoin, of } from 'rxjs'
import { SyncActions } from './sync.actions'
import { Store } from '@ngrx/store'
import { ISyncState, syncFeature } from './sync.reducer'
import { SyncService } from '../shared/sync.service'
import { NavController } from '@ionic/angular'
import { SettingsActions } from '../settings/settings.actions'
import { environment } from 'src/environments/environment'
import { ActivatedRoute } from '@angular/router'

@Injectable()
export class SyncEffects {
    private readonly delayTimeout = environment.production ? 1000 : 0

    constructor(
        private actions$: Actions,
        private syncStore: Store<ISyncState>,
        private syncService: SyncService,
        private navController: NavController,
        private activatedRoute: ActivatedRoute,
    ) {}

    sync$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SyncActions.syncInit),
            delay(this.delayTimeout),
            withLatestFrom(
                this.syncStore.select(syncFeature.selectNextSyncToken),
            ),
            switchMap(([, nextSyncToken]) =>
                this.syncService
                    .checkForUpdate(nextSyncToken)
                    .pipe(
                        map((syncCollection) =>
                            this.syncService.hasChange(syncCollection)
                                ? SyncActions.syncStart({ syncCollection })
                                : SyncActions.syncComplete(syncCollection),
                        ),
                    ),
            ),
            catchError((error) => {
                console.error(error)
                return of(SyncActions.syncFailure())
            }),
        ),
    )

    syncStart$ = createEffect(() =>
        this.actions$.pipe(
            ofType(SyncActions.syncStart),
            delay(this.delayTimeout),
            switchMap(({ syncCollection }) =>
                forkJoin([
                    this.syncService.removeDeletedItems([
                        ...syncCollection.deletedAssets,
                        ...syncCollection.deletedEntries,
                    ]),
                    this.syncService.storeChangedEntries(
                        syncCollection.entries,
                    ),
                    this.syncService.cacheAssets(syncCollection.assets),
                ]).pipe(
                    defaultIfEmpty([]),
                    map(() =>
                        SyncActions.syncComplete({
                            nextSyncToken: syncCollection.nextSyncToken,
                        }),
                    ),
                ),
            ),
            catchError((error) => {
                console.error(error)
                return of(SyncActions.syncFailure())
            }),
        ),
    )

    syncSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(SyncActions.syncComplete),
                delay(this.delayTimeout),
                withLatestFrom(
                    this.activatedRoute.queryParamMap.pipe(
                        map((params) => params.get('redirectTo')),
                    ),
                ),
                tap(([, redirectTo]) => {
                    this.navController.navigateForward(redirectTo || 'home', {
                        replaceUrl: true,
                    })
                }),
            ),
        {
            dispatch: false,
        },
    )

    changeEnv$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(SettingsActions.changeEnv),
                switchMap(() =>
                    this.syncService.clearCache().pipe(
                        tap(() => {
                            this.navController.navigateForward('sync', {
                                replaceUrl: true,
                            })
                        }),
                    ),
                ),
            ),
        {
            dispatch: false,
        },
    )
}
