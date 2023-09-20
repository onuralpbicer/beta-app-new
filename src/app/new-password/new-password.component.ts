import { Component, OnInit } from '@angular/core'
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidatorFn,
    Validators,
} from '@angular/forms'
import { Store } from '@ngrx/store'
import { ViewStatus } from '../shared/types'
import { AuthService } from '../shared/auth.service'

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styleUrls: ['./new-password.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule],
})
export class NewPassword implements OnInit {
    public viewStatus = ViewStatus.INITIAL

    constructor(private fb: FormBuilder, private authService: AuthService) {}

    public form = this.fb.group(
        {
            password: this.fb.control('', Validators.required),
            confirmPassword: this.fb.control('', Validators.required),
        },
        {
            validators: [],
        },
    )

    ngOnInit() {}

    async submit() {
        if (this.form.invalid) {
            return
        }

        const { password, confirmPassword } = this.form.value

        if (!confirmPassword || !password || password !== confirmPassword) {
            return
        }

        try {
            await this.authService.completeNewPassword(password)
            this.viewStatus = ViewStatus.SUCCESS
        } catch (error) {
            console.error(error)
            this.viewStatus = ViewStatus.FAILURE
        }
    }
}
