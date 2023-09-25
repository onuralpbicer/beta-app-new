import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { ISyncState, syncFeature } from './sync/sync.reducer'
import { filter, take } from 'rxjs'
import { NavController } from '@ionic/angular'
import { Location } from '@angular/common'

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private syncStore: Store<ISyncState>,
        private navController: NavController,
        private location: Location,
    ) {}

    ngOnInit(): void {
        this.syncStore
            .select(syncFeature.selectSyncInitial)
            .pipe(take(1), filter(Boolean))
            .subscribe(() => {
                const params = new URLSearchParams({
                    redirectTo: this.location.path(),
                })
                this.navController.navigateForward(
                    'sync' + `?${params.toString()}`,
                    {
                        replaceUrl: true,
                    },
                )
            })
    }
}
