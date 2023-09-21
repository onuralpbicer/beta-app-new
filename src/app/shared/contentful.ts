import {
    Entry,
    EntryFieldTypes,
    EntrySkeletonType,
    FieldsType,
    SyncCollection,
} from 'contentful'

export enum IContentfulEnvs {
    staging = 'staging',
    production = 'production',
}

export enum IContentfulContent {
    EquipmentTypeList = '64du1HBfTqb166SxhWTr33',
}

export type ISyncCollection = SyncCollection<
    EntrySkeletonType<{}>,
    'WITHOUT_LINK_RESOLUTION'
>

export type IContentfulEntry<T extends FieldsType> = Entry<
    EntrySkeletonType<T>,
    'WITHOUT_LINK_RESOLUTION',
    string
>
export type ExtractType<T extends FieldsType> = IContentfulEntry<T>['fields']

export interface IEquipmentFields {
    name: EntryFieldTypes.Text
    body: EntryFieldTypes.RichText
    maintenanceTasks: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
}

export type IEquipmentEntry = IContentfulEntry<IEquipmentFields>

export interface IEquipmentTypeFields {
    name: EntryFieldTypes.Text
    equipments: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<EntrySkeletonType<IEquipmentFields>>
    >
}

export type IEquipmentTypeEntry = IContentfulEntry<IEquipmentTypeFields>

export interface IEquipmentTypeListFields {
    title: EntryFieldTypes.Text
    equipmentTypes: EntryFieldTypes.Array<
        EntryFieldTypes.EntryLink<EntrySkeletonType<IEquipmentTypeFields>>
    >
}

export type IEquipmentTypeListEntry = IContentfulEntry<IEquipmentTypeListFields>
