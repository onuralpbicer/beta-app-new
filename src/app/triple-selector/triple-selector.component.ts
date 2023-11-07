import { Component, Input, forwardRef } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IonicModule, SegmentCustomEvent, SegmentValue } from '@ionic/angular'
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms'

@Component({
    selector: 'app-triple-selector',
    standalone: true,
    imports: [CommonModule, IonicModule, ReactiveFormsModule],
    templateUrl: './triple-selector.component.html',
    styleUrls: ['./triple-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TripleSelectorComponent),
            multi: true,
        },
    ],
})
export class TripleSelectorComponent implements ControlValueAccessor {
    public value: SegmentValue | null = null
    public disabled = false

    handleChange(_event: Event) {
        const event = _event as SegmentCustomEvent
        this.value = event.detail.value ?? null
        this.onChanged(event.detail.value ?? null)
    }

    public onChanged(_value: SegmentValue | null) {}

    public onTouched() {}

    registerOnChange(fn: (value: SegmentValue | null) => {}): void {
        this.onChanged = fn
    }

    registerOnTouched(fn: () => {}): void {
        this.onTouched = fn
    }

    writeValue(value: SegmentValue | null): void {
        this.value = value
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled
    }
}
