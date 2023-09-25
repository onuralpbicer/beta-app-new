import { Injectable } from '@angular/core'
import { DataStore, SortDirection } from 'aws-amplify'
import { Maintenance } from 'src/models'
import { IMaintenanceTask } from '../maintenance/model'

@Injectable({
    providedIn: 'root',
})
export class DatastoreService {
    constructor() {
        DataStore.configure()
    }

    async init() {
        await DataStore.start()
    }

    async stop() {
        await DataStore.stop()
        await DataStore.clear()
    }

    async createMaintenance(
        equipmentId: string,
        tasks: IMaintenanceTask[],
        username: string,
        type: string,
        comments?: string,
    ) {
        const maintenance = new Maintenance({
            equipmentId,
            timestamp: new Date().toISOString(),
            tasks: JSON.stringify(tasks),
            createdBy: username,
            maintenanceType: type,
            comments,
        })

        await DataStore.save(maintenance)
    }

    async getMaintenanceList(equipmentId: string) {
        const maintenanceList = await DataStore.query(
            Maintenance,
            (maintenance) => maintenance.equipmentId.eq(equipmentId),
            {
                sort: (maintenance) =>
                    maintenance.timestamp(SortDirection.DESCENDING),
            },
        )

        return maintenanceList
    }
}
