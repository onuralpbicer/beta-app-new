import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromSync from './sync.reducer'

export const selectSyncState = createFeatureSelector<fromSync.ISyncState>(
    fromSync.syncFeatureKey,
)
