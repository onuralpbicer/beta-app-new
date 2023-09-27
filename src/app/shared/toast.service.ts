import { Injectable } from '@angular/core'
import { ToastController } from '@ionic/angular'

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastController: ToastController) {}

    public async showErrorToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            color: 'danger',
            position: 'top',
        })
        await toast.present()
    }

    public async showSuccessToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            color: 'success',
            position: 'top',
        })
        await toast.present()
    }
}
