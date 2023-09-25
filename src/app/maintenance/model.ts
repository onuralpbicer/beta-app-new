type Nullable<T> = T | null

export interface IMaintenanceTask {
    name: string
    description?: string
    uygun: Nullable<boolean>
    yapilanIs: Nullable<'Onarildi' | 'Yenilendi'>
}
