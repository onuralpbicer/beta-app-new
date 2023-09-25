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
    tap,
} from 'rxjs'
import {
    IEquipmentEntry,
    IEquipmentFields,
    IEquipmentTypeEntry,
    IEquipmentTypeFields,
} from '../shared/contentful'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule],
    encapsulation: ViewEncapsulation.None,
})
export class EquipmentComponent implements OnInit {
    public equipmentName$!: Observable<string>
    public equipmentBody$!: Observable<string>
    public equipment$!: Observable<IEquipmentEntry>

    constructor(
        private syncService: SyncService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.equipment$ = this.activatedRoute.paramMap.pipe(
            map((params) => params.get('id')),
            filter(Boolean),
            switchMap((id) => this.syncService.getEntry<IEquipmentFields>(id)),
        )

        this.equipmentBody$ = this.equipment$.pipe(
            map((equipment) => equipment.fields.body),
        )

        this.equipmentName$ = this.equipment$.pipe(
            map((equipment) => equipment.fields.name),
        )
    }
}
