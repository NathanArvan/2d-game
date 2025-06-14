import { Component, input } from '@angular/core';
import { Character } from '../../models/character.model';
import { TurnState } from '../../models/turn.model';

@Component({
  selector: 'app-initiative-bar',
  standalone: true,
  imports: [],
  templateUrl: './initiative-bar.component.html',
  styleUrl: './initiative-bar.component.css'
})
export class InitiativeBarComponent {
    readonly characters = input<Character[]>([]);
    readonly turnState = input<TurnState>();

}
