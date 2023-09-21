import { createFeature, createReducer, createSelector, on } from '@ngrx/store'
import { SyncActions } from './sync.actions'
import { equals, includes, not } from 'rambda'
import { SettingsActions } from '../settings/settings.actions'

export const syncFeatureKey = 'sync'

export enum ISyncStatus {
    Initial = 'Initial',
    Checking = 'Checking',
    Syncing = 'Syncing',
    Success = 'Success',
    Failure = 'Failure',
}

export interface ISyncState {
    viewStatus: ISyncStatus
    nextSyncToken: string | null
}

export const initialState: ISyncState = {
    viewStatus: ISyncStatus.Initial,
    nextSyncToken: null,
}

const excludeKeys: (keyof ISyncState)[] = ['viewStatus']
export const syncReducerSyncKeys = Object.keys(initialState).filter((key) =>
    not(includes(key, excludeKeys)),
)

export const reducer = createReducer(
    initialState,
    on(SyncActions.syncInit, (state) => ({
        ...state,
        viewStatus: ISyncStatus.Checking,
    })),
    on(SyncActions.syncStart, (state) => ({
        ...state,
        viewStatus: ISyncStatus.Syncing,
    })),
    on(SyncActions.syncComplete, (state, { nextSyncToken }) => ({
        ...state,
        viewStatus: ISyncStatus.Success,
        nextSyncToken: nextSyncToken || state.nextSyncToken,
    })),
    on(SyncActions.syncFailure, (state) => ({
        ...state,
        viewStatus: ISyncStatus.Failure,
    })),
    on(SettingsActions.changeEnv, () => ({
        ...initialState,
    })),
)

export const syncFeature = createFeature({
    name: syncFeatureKey,
    reducer,
    extraSelectors: ({ selectViewStatus }) => ({
        selectSyncInitial: createSelector(
            selectViewStatus,
            equals(ISyncStatus.Initial),
        ),
    }),
})
