import { NgModule, inject } from '@angular/core'
import {
    CanActivateFn,
    PreloadAllModules,
    Router,
    RouterModule,
    Routes,
} from '@angular/router'
import { AuthService } from './shared/auth.service'

const HasCognitoUserGuard: CanActivateFn = (route, snapshot) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.enableNewPassword) {
        return true
    }
    return router.createUrlTree(['login'])
}

const AuthGuard: CanActivateFn = async () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    try {
        await authService.getCurrentUser()

        return true
    } catch (error) {
        return router.createUrlTree(['login'])
    }
}

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
