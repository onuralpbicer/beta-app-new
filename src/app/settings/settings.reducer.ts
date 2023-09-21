import { createFeature, createReducer, on } from '@ngrx/store'
import { SettingsActions } from './settings.actions'
import { environment } from 'src/environments/environment'
import { IContentfulEnvs } from '../shared/contentful'

export const settingsFeatureKey = 'settings'

export interface ISettingsState {
    contentfulEnv: IContentfulEnvs
}

export const initialState: ISettingsState = {
    contentfulEnv: environment.production
        ? IContentfulEnvs.production
        : IContentfulEnvs.staging,
}

export const reducer = createReducer(
    initialState,
    on(SettingsActions.changeEnv, (state, { env }) => ({
        ...state,
        contentfulEnv: env,
    })),
)

export const settingsFeature = createFeature({
    name: settingsFeatureKey,
    reducer,
})
