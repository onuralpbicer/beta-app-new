import { Component, OnInit } from '@angular/core'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { ViewStatus } from '../shared/types'
import { AuthService } from '../shared/auth.service'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
    public viewStatus = ViewStatus.INITIAL

    constructor(private fb: FormBuilder, private authService: AuthService) {}

    public form = this.fb.group({
        username: this.fb.control('', Validators.required),
        password: this.fb.control('', Validators.required),
    })

    ngOnInit() {}

    async submit() {
        if (this.form.invalid) {
            return
        }

        const { username, password } = this.form.value

        if (!username || !password) {
            return
        }

        this.viewStatus = ViewStatus.LOADING

        try {
            await this.authService.login(username, password)
            this.viewStatus = ViewStatus.SUCCESS
        } catch (error) {
            console.error(error)
            this.viewStatus = ViewStatus.FAILURE
        }
    }
}
