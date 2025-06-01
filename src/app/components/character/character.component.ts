import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character',
  standalone: true,
  imports: [],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent {
  @Input() character: Character | null = null;
}
