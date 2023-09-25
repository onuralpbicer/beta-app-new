import { Component, OnInit } from '@angular/core'
import { AuthService } from '../shared/auth.service'
import { Store } from '@ngrx/store'
import { ISyncState, syncFeature } from '../sync/sync.reducer'
import { NavController } from '@ionic/angular'
import {
    Observable,
    defaultIfEmpty,
    filter,
    forkJoin,
    map,
    switchMap,
    take,
    tap,
} from 'rxjs'
import { SettingsActions } from '../settings/settings.actions'
import {
    IContentfulContent,
    IContentfulEnvs,
    IEquipmentTypeEntry,
    IEquipmentTypeFields,
    IEquipmentTypeListFields,
} from '../shared/contentful'
import { environment } from 'src/environments/environment'
import { SyncService } from '../shared/sync.service'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    public equipmentTypeList$!: Observable<IEquipmentTypeEntry[]>

    constructor(
        private authService: AuthService,
        private syncStore: Store<ISyncState>,
        private syncService: SyncService,
    ) {}

    ngOnInit(): void {
        if (!environment.production) {
            ;(window as any).test = (env: IContentfulEnvs) =>
                this.syncStore.dispatch(SettingsActions.changeEnv({ env }))
        }

        this.equipmentTypeList$ = this.syncService
            .getEntry<IEquipmentTypeListFields>(
                IContentfulContent.EquipmentTypeList,
            )
            .pipe(
                map((entry) => entry.fields.equipmentTypes),
                switchMap((list) =>
                    forkJoin(
                        list.map((item) =>
                            this.syncService.getEntry<IEquipmentTypeFields>(
                                item.sys.id,
                            ),
                        ),
                    ).pipe(defaultIfEmpty([])),
                ),
            )

        this.equipmentTypeList$.subscribe(console.log)
    }

    logout() {
        this.authService.logout()
    }
}
