import { CommonModule } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, RouterModule } from '@angular/router'
import { IonicModule, NavController } from '@ionic/angular'
import {
    Subscription,
    combineLatest,
    filter,
    from,
    map,
    switchMap,
    take,
    throwError,
    withLatestFrom,
} from 'rxjs'
import { SyncService } from '../shared/sync.service'
import { IEquipmentFields } from '../shared/contentful'
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { IMaintenanceTask } from './model'
import { Maintenance } from 'src/models'
import { AuthService } from '../shared/auth.service'
import { DatastoreService } from '../shared/datastore.service'
import { ToastService } from '../shared/toast.service'
import { MESSAGES } from '../shared/messages'
import { isNil } from 'rambda'

@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule, ReactiveFormsModule],
})
export class MaintenanceComponent implements OnInit, OnDestroy {
    public form = this.fb.group({
        type: this.fb.nonNullable.control<string | null>(
            null,
            Validators.required,
        ),
        comments: this.fb.nonNullable.control<string | null>(null),
        maintenanceTasks: this.fb.nonNullable.array<IMaintenanceTask>([]),
    })

    public formSubscriptions: Array<Subscription> = []

    public equipment$$?: Subscription

    public submitting = false

    constructor(
        private syncService: SyncService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private authService: AuthService,
        private datastore: DatastoreService,
        private navController: NavController,
        private toastService: ToastService,
    ) {}

    ngOnInit(): void {
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

        this.form.valueChanges.subscribe(console.log)
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
                fg.controls.uygun.valueChanges.subscribe((value) => {
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
        if (this.form.invalid || this.submitting) {
            return
        }

        this.submitting = true
        combineLatest([
            this.activatedRoute.paramMap.pipe(
                map((params) => params.get('id')),
                filter(Boolean),
                take(1),
            ),
            from(this.authService.getUserId()),
        ])
            .pipe(
                switchMap(([equipmentId, username]) =>
                    isNil(this.form.value.type) ||
                    isNil(this.form.value.comments)
                        ? throwError(() => new Error())
                        : this.datastore.createMaintenance(
                              equipmentId,
                              this.form.value.maintenanceTasks || [],
                              username,
                              this.form.value.type,
                              this.form.value.comments || undefined,
                          ),
                ),
            )
            .subscribe({
                next: () => {
                    console.log('success')
                    this.toastService.showSuccessToast(MESSAGES.submitSuccess)
                    this.navController.back()
                },
                error: (error) => {
                    this.toastService.showErrorToast(MESSAGES.submitFail)
                    console.error(error)
                },
                complete: () => {
                    this.submitting = false
                },
            })
    }

    get maintenanceTasks() {
        return this.form.controls.maintenanceTasks
    }
}
