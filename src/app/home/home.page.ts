import { Component, OnInit } from '@angular/core'
import { AuthService } from '../shared/auth.service'
import { Store } from '@ngrx/store'
import { ISyncState, syncFeature } from '../sync/sync.reducer'
import { NavController } from '@ionic/angular'
import { filter, take } from 'rxjs'
import { SettingsActions } from '../settings/settings.actions'
import { IContentfulEnvs } from '../shared/contentful'
import { environment } from 'src/environments/environment'

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
        if (!environment.production) {
            ;(window as any).test = (env: IContentfulEnvs) =>
                this.syncStore.dispatch(SettingsActions.changeEnv({ env }))
        }

        this.syncStore
            .select(syncFeature.selectSyncInitial)
            .pipe(take(1), filter(Boolean))
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
