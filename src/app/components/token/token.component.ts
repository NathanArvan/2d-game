import { Component, input } from '@angular/core';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css'
})
export class TokenComponent {
  content = input<Character | Item | null>();
}
