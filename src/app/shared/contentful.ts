import { EntrySkeletonType, SyncCollection, Entry } from 'contentful'

export enum IContentfulEnvs {
    staging = 'staging',
    production = 'production',
}

export enum IContentfulContent {
    EquipmentTypeList = '4Xi1mtiYcpKsR2ZKWLn9mN',
}

export type ISyncCollection = SyncCollection<
    EntrySkeletonType<{}>,
    'WITHOUT_LINK_RESOLUTION'
>
