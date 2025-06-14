import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { TurnState } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() { }

  createBattle(characterIds: number[]) : TurnState {
    const battle: TurnState = {
      characterIdTurnOrder: characterIds,
      roundNumber: 1,
      currentTurn: 0
    };
    return battle;
  }

  endTurn(battle: TurnState) {
    battle.currentTurn++;
    if (battle.currentTurn >= battle.characterIdTurnOrder.length) {
      battle.currentTurn = 0; // Reset to the first character for
      battle.roundNumber++;
    }
    return battle;
  }

  getCharacterIdAtTurn(battle: TurnState, turnIndex: number): number | undefined {
    const characterIds = battle.characterIdTurnOrder;
    if (turnIndex < characterIds.length) {
      const characterId = characterIds[turnIndex];
      return characterId;
    } else {
      const remained = turnIndex % characterIds.length; 
      return characterIds[remained];
    }
  }
}
