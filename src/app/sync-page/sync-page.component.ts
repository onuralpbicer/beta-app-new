import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ISyncState, ISyncStatus, syncFeature } from '../sync/sync.reducer'
import { SyncActions } from '../sync/sync.actions'
import { Observable, map } from 'rxjs'
import { CommonModule } from '@angular/common'
import { IonicModule } from '@ionic/angular'
import { includes } from 'rambda'

@Component({
    selector: 'app-sync-page',
    templateUrl: './sync-page.component.html',
    styleUrls: ['./sync-page.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule],
})
export class SyncPageComponent implements OnInit {
    public syncStatus$!: Observable<ISyncStatus>
    public isLoading$!: Observable<boolean>

    public SyncStatus = ISyncStatus

    constructor(private syncStore: Store<ISyncState>) {
        this.syncStatus$ = this.syncStore.select(syncFeature.selectViewStatus)

        this.isLoading$ = this.syncStatus$.pipe(
            map((status) =>
                includes(status, [ISyncStatus.Checking, ISyncStatus.Syncing]),
            ),
        )
    }

    ngOnInit(): void {
        this.syncStore.dispatch(SyncActions.syncInit())
    }
}
