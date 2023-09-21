import { createActionGroup, emptyProps, props } from '@ngrx/store'
import { ISyncStatus } from './sync.reducer'
import { ISyncCollection } from '../shared/contentful'

export const SyncActions = createActionGroup({
    source: 'Sync',
    events: {
        syncInit: emptyProps(),
        syncStart: props<{ syncCollection: ISyncCollection }>(),
        syncComplete: props<{ nextSyncToken?: string }>(),
        syncFailure: emptyProps(),
    },
})
