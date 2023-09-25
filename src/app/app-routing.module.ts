import { NgModule } from '@angular/core'
import { PreloadAllModules, RouterModule, Routes } from '@angular/router'
import {
    AuthGuard,
    ContentfulExistsGuard,
    HasCognitoUserGuard,
} from './shared/guards'

const routes: Routes = [
    {
        path: 'home',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./home/home.module').then((m) => m.HomePageModule),
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then((m) => m.LoginComponent),
    },
    {
        path: 'new-password',
        canActivate: [HasCognitoUserGuard],
        loadComponent: () =>
            import('./new-password/new-password.component').then(
                (m) => m.NewPassword,
            ),
    },
    {
        path: 'sync',
        canActivate: [AuthGuard],
        loadComponent: () =>
            import('./sync-page/sync-page.component').then(
                (m) => m.SyncPageComponent,
            ),
    },
    {
        path: 'equipment-list/:id',
        canActivate: [AuthGuard, ContentfulExistsGuard],
        loadComponent: () =>
            import('./equipment-list/equipment-list.component').then(
                (m) => m.EquipmentListComponent,
            ),
    },
    {
        path: 'equipment/:id',
        canActivate: [AuthGuard, ContentfulExistsGuard],
        loadComponent: () =>
            import('./equipment/equipment.component').then(
                (m) => m.EquipmentComponent,
            ),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
