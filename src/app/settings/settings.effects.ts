import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'

@Injectable()
export class SettingsEffects {
    constructor(private actions$: Actions) {}
}
