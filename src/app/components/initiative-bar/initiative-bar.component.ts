import { Component, computed, effect, input, OnInit, signal } from '@angular/core';
import { Character } from '../../models/character.model';
import { TurnState } from '../../models/turn.model';
import { BattleService } from '../../services/battle.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-initiative-bar',
  standalone: true,
  imports: [],
  templateUrl: './initiative-bar.component.html',
  styleUrl: './initiative-bar.component.css'
})
export class InitiativeBarComponent  {

    readonly turnState = input<TurnState>();

    readonly initiativeList = computed<Character[]>(() => {
      console.log(this.turnState());
      return this.buildInitiativeList(this.turnState());
    });

    constructor(
      private battleService: BattleService,
      private characterService: CharacterService,
    ) { }

    buildInitiativeList(turnState: TurnState | undefined): Character[] {

      if (!turnState) return[];

      let list = [];
      const iterations = 3;
      const roundLength = turnState.characterIdTurnOrder.length;
      const totalLength = roundLength * iterations;

      for (let i = turnState.currentTurn; i < totalLength + turnState.currentTurn; i++) {
        const characterId = this.battleService.getCharacterIdAtTurn(turnState, i);
        if(characterId) {
          const character = this.characterService.getCharacterById(characterId);
          if (character) {
            list.push(character);
          }
        }
      }
      return list;
    }

}
