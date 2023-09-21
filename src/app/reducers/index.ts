import { isDevMode } from '@angular/core'
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'
import {
    syncFeatureKey,
    syncReducerSyncKeys,
    reducer as syncReducer,
} from '../sync/sync.reducer'

export interface State {}

export const reducers: ActionReducerMap<State> = {
    [syncFeatureKey]: syncReducer,
}

function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({
        keys: [
            {
                [syncFeatureKey]: syncReducerSyncKeys,
            },
        ],
        rehydrate: true,
        storageKeySerializer: (key) => `beta-app-${key}`,
    })(reducer)
}

export const metaReducers: MetaReducer<State>[] = [
    localStorageSyncReducer,
    ...(isDevMode() ? [] : []),
]
