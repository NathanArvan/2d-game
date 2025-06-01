import { Component, Input } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
 @Input() item: Item | null = null;
}
