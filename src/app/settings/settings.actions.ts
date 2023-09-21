import { createActionGroup, props } from '@ngrx/store'
import { IContentfulEnvs } from '../shared/contentful'

export const SettingsActions = createActionGroup({
    source: 'Settings',
    events: {
        changeEnv: props<{ env: IContentfulEnvs }>(),
    },
})
