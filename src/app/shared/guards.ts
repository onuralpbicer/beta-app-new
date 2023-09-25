import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from './auth.service'
import { SyncService } from './sync.service'
import { map, tap } from 'rxjs'

export const HasCognitoUserGuard: CanActivateFn = (route, snapshot) => {
    const authService = inject(AuthService)
    const router = inject(Router)

    if (authService.enableNewPassword) {
        return true
    }
    return router.createUrlTree(['login'])
}

export const AuthGuard: CanActivateFn = async () => {
    const authService = inject(AuthService)
    const router = inject(Router)

    try {
        await authService.getCurrentUser()

        return true
    } catch (error) {
        return router.createUrlTree(['login'])
    }
}

export const ContentfulExistsGuard: CanActivateFn = (route, snapshot) => {
    const syncService = inject(SyncService)
    const router = inject(Router)

    const id = route.paramMap.get('id')

    const redirectTo = 'home'

    if (!id) {
        return router.createUrlTree([redirectTo])
    }

    return syncService.getEntry(id).pipe(
        map((entry) => !!entry.sys),
        map((exists) => exists || router.createUrlTree([redirectTo])),
    )
}
