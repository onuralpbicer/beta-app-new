import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { RouterModule } from '@angular/router'
import { IonicModule } from '@ionic/angular'

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
    standalone: true,
    imports: [CommonModule, IonicModule, RouterModule],
})
export class ListItemComponent {
    @Input() title!: string
    @Input() routerLink!: string | (string | number)[]
}
