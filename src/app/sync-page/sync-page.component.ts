import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ISyncState, ISyncStatus, syncFeature } from '../sync/sync.reducer'
import { SyncActions } from '../sync/sync.actions'
import { Observable } from 'rxjs'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-sync-page',
    templateUrl: './sync-page.component.html',
    styleUrls: ['./sync-page.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class SyncPageComponent implements OnInit {
    public syncStatus$!: Observable<ISyncStatus>

    constructor(private syncStore: Store<ISyncState>) {
        this.syncStatus$ = this.syncStore.select(syncFeature.selectViewStatus)
    }

    ngOnInit(): void {
        this.syncStore.dispatch(SyncActions.syncInit())
    }
}
