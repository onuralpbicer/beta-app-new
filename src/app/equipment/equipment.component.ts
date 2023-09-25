import {
    Component,
    OnInit,
    Pipe,
    PipeTransform,
    ViewEncapsulation,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { SyncService } from '../shared/sync.service'
import { ActivatedRoute, RouterModule } from '@angular/router'
import {
    Observable,
    defaultIfEmpty,
    filter,
    forkJoin,
    from,
    map,
    switchMap,
    take,
    tap,
} from 'rxjs'
import {
    IEquipmentEntry,
    IEquipmentFields,
    IEquipmentTypeEntry,
    IEquipmentTypeFields,
} from '../shared/contentful'
import { IonicModule, NavController } from '@ionic/angular'
import { DatastoreService } from '../shared/datastore.service'
import { LazyMaintenance } from 'src/models'
import { ListItemComponent } from '../list-item/list-item.component'

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule, ListItemComponent],
    encapsulation: ViewEncapsulation.None,
})
export class EquipmentComponent implements OnInit {
    public equipmentName$!: Observable<string>
    public equipmentBody$!: Observable<string>
    public equipment$!: Observable<IEquipmentEntry>
    public maintenance$!: Observable<LazyMaintenance[]>

    constructor(
        private syncService: SyncService,
        private activatedRoute: ActivatedRoute,
        private navController: NavController,
        private datastore: DatastoreService,
    ) {}

    ngOnInit(): void {
        const equipmentId$ = this.activatedRoute.paramMap.pipe(
            map((params) => params.get('id')),
            filter(Boolean),
        )

        this.equipment$ = equipmentId$.pipe(
            switchMap((id) => this.syncService.getEntry<IEquipmentFields>(id)),
        )

        this.equipmentBody$ = this.equipment$.pipe(
            map((equipment) => equipment.fields.body),
        )

        this.equipmentName$ = this.equipment$.pipe(
            map((equipment) => equipment.fields.name),
        )

        this.maintenance$ = equipmentId$.pipe(
            switchMap((equipmentId) =>
                this.datastore.getMaintenanceList(equipmentId),
            ),
        )
    }

    public goToMaintenance() {
        this.activatedRoute.paramMap
            .pipe(
                map((params) => params.get('id')),
                take(1),
            )
            .subscribe((id) => {
                this.navController.navigateForward(['/maintenance', id])
            })
    }
}
