import { isDevMode } from '@angular/core'
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store'
import { localStorageSync } from 'ngrx-store-localstorage'

export interface State {}

export const reducers: ActionReducerMap<State> = {}

function localStorageSyncReducer(
    reducer: ActionReducer<any>,
): ActionReducer<any> {
    return localStorageSync({
        keys: [],
        rehydrate: true,
        storageKeySerializer: (key) => `beta-app-${key}`,
    })(reducer)
}

export const metaReducers: MetaReducer<State>[] = [
    localStorageSyncReducer,
    ...(isDevMode() ? [] : []),
]
