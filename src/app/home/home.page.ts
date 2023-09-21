import { Component, OnInit } from '@angular/core'
import { AuthService } from '../shared/auth.service'
import { Store } from '@ngrx/store'
import { ISyncState, syncFeature } from '../sync/sync.reducer'
import { NavController } from '@ionic/angular'
import { filter } from 'rxjs'

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(
        private authService: AuthService,
        private syncStore: Store<ISyncState>,
        private navController: NavController,
    ) {}

    ngOnInit(): void {
        this.syncStore
            .select(syncFeature.selectSyncInitial)
            .pipe(filter(Boolean))
            .subscribe(() => {
                this.navController.navigateForward('sync', {
                    replaceUrl: true,
                })
            })
    }

    logout() {
        this.authService.logout()
    }
}
