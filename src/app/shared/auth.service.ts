import { Injectable } from '@angular/core'
import { Auth, Hub } from 'aws-amplify'
import { CognitoUser } from 'amazon-cognito-identity-js'
import { NavController, ToastController } from '@ionic/angular'
import { CUSTOM_CHANNEL } from './types'
import { DatastoreService } from './datastore.service'
import { ToastService } from './toast.service'
import { MESSAGES } from './messages'

const requiresNewPasswordEvent = 'require-new-password'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private navContoller: NavController,
        private datastore: DatastoreService,
        private toastService: ToastService,
    ) {
        Hub.listen('auth', async ({ payload: { event, data } }) => {
            console.log('hub event', 'auth', event, data)
            switch (event) {
                case 'signIn':
                    await this.datastore.init()
                    this.toastService.showSuccessToast(MESSAGES.loginSuccess)
                    this.navContoller.navigateForward('home', {
                        replaceUrl: true,
                    })
                    break

                case 'signIn_failure':
                    await this.datastore.stop()
                    this.toastService.showErrorToast(MESSAGES.loginFail)
                    this.navContoller.navigateBack('login')
                    break

                case 'signOut':
                    await this.datastore.stop()
                    this.toastService.showSuccessToast(MESSAGES.logoutSuccess)
                    this.navContoller.navigateBack('login')
                    break
            }
        })
        Hub.listen(CUSTOM_CHANNEL, ({ payload: { event, data } }) => {
            console.log('hub event', CUSTOM_CHANNEL, event, data)
            switch (event) {
                case requiresNewPasswordEvent:
                    this.navContoller.navigateForward('new-password', {
                        replaceUrl: true,
                    })
                    break
            }
        })
    }

    private newPasswordUser?: CognitoUser

    get enableNewPassword() {
        return !!this.newPasswordUser
    }

    public async logout() {
        await Auth.signOut()
    }

    public async login(
        username: string,
        password: string,
    ): Promise<CognitoUser> {
        const user = await Auth.signIn(username, password)

        if (user?.challengeName === 'NEW_PASSWORD_REQUIRED') {
            this.newPasswordUser = user
            Hub.dispatch(CUSTOM_CHANNEL, {
                event: requiresNewPasswordEvent,
            })
        }

        return user
    }

    public async signout() {
        try {
            await Auth.signOut()
        } catch (error) {
            console.log('error signing out: ', error)
        }
    }

    public async completeNewPassword(password: string): Promise<CognitoUser> {
        if (!this.newPasswordUser) {
            throw new Error(
                'Could not find cognito user. Please try again later',
            )
        }

        const user = await Auth.completeNewPassword(
            this.newPasswordUser,
            password,
            {
                email: this.newPasswordUser.getUsername() + '@email.com',
            },
        )

        this.newPasswordUser = undefined

        return user
    }

    public async getCurrentUser(): Promise<CognitoUser> {
        return Auth.currentAuthenticatedUser()
    }

    public async getUserId() {
        const user = await this.getCurrentUser()
        return user.getUsername()
    }
}
