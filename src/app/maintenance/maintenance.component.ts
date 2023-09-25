import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'
import { Subscription, filter, map, switchMap } from 'rxjs'
import { SyncService } from '../shared/sync.service'
import { IEquipmentFields } from '../shared/contentful'
import {
    FormArray,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { IMaintenanceTask } from './model'

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
    public form!: FormGroup
    public formSubscriptions: Array<Subscription> = []

    public equipment$$?: Subscription

    constructor(
        private syncService: SyncService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
    ) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            type: [null, Validators.required],
            maintenanceTasks: this.fb.array<IMaintenanceTask>([]),
        })

        const equipment$ = this.activatedRoute.paramMap.pipe(
            map((params) => params.get('id')),
            filter(Boolean),
            switchMap((id) => this.syncService.getEntry<IEquipmentFields>(id)),
        )

        this.equipment$$ = equipment$
            .pipe(map((equipment) => equipment.fields.maintenanceTasks))
            .subscribe((maintenanceTasks) => {
                this.initialiseForm(maintenanceTasks)
            })
    }

    public initialiseForm(maintenanceTasks: string[]) {
        const maintenanceTasksControl = this.form.controls[
            'maintenanceTasks'
        ] as FormArray

        this.form.reset()
        maintenanceTasksControl.clear()

        maintenanceTasks.forEach((task) => {
            const fg = this.fb.group({
                name: [task],
                description: [undefined],
                uygun: [null, Validators.required],
                yapilanIs: [null],
            })

            this.formSubscriptions.push(
                fg.controls['uygun'].valueChanges.subscribe((value) => {
                    fg.markAsTouched()

                    const control = fg.controls['yapilanIs']

                    if (value === true || value === 'true') {
                        control.clearValidators()
                    } else {
                        control.addValidators(Validators.required)
                    }
                    control.updateValueAndValidity()
                }),
            )
            maintenanceTasksControl.push(fg)
        })
    }

    ngOnDestroy(): void {
        this.formSubscriptions.forEach((subscription) =>
            subscription.unsubscribe(),
        )
        this.equipment$$?.unsubscribe()
    }

    submit() {
        console.log('submit')
    }

    get maintenanceTasks() {
        return this.form.get('maintenanceTasks') as FormArray<FormGroup>
    }
}
