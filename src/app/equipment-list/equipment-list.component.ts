import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SyncService } from '../shared/sync.service'
import { ActivatedRoute, RouterModule } from '@angular/router'
import {
    Observable,
    defaultIfEmpty,
    filter,
    forkJoin,
    map,
    switchMap,
} from 'rxjs'
import {
    IEquipmentEntry,
    IEquipmentFields,
    IEquipmentTypeEntry,
    IEquipmentTypeFields,
} from '../shared/contentful'
import { IonicModule } from '@ionic/angular'
import { ListItemComponent } from '../list-item/list-item.component'

@Component({
    selector: 'app-equipment-list',
    templateUrl: './equipment-list.component.html',
    styleUrls: ['./equipment-list.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule, ListItemComponent],
})
export class EquipmentListComponent implements OnInit {
    public equipmentType$!: Observable<IEquipmentTypeEntry>
    public equipmentList$!: Observable<IEquipmentEntry[]>

    constructor(
        private syncService: SyncService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.equipmentType$ = this.activatedRoute.paramMap.pipe(
            map((params) => params.get('id')),
            filter(Boolean),
            switchMap((id) =>
                this.syncService.getEntry<IEquipmentTypeFields>(id),
            ),
        )

        this.equipmentList$ = this.equipmentType$.pipe(
            switchMap((entry) =>
                forkJoin(
                    entry.fields.equipments.map((equipment) =>
                        this.syncService.getEntry<IEquipmentFields>(
                            equipment.sys.id,
                        ),
                    ),
                ).pipe(defaultIfEmpty([])),
            ),
        )
    }
}
