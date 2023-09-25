import { Injectable } from '@angular/core'
import { DataStore } from 'aws-amplify'
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
    ) {
        const maintenance = new Maintenance({
            equipmentId,
            timestamp: new Date().toISOString(),
            tasks: JSON.stringify(tasks),
            createdBy: username,
        })

        await DataStore.save(maintenance)
    }
}
