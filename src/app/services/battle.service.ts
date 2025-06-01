import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Battle } from '../models/turn.model';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() { }

  createBattle(characters: Character[]) : Battle {
    const battle: Battle = {
      turnOrder: characters,
      roundNumber: 1,
      currentTurn: 0
    };
    return battle;
  }

  endTurn(battle: Battle) {
    battle.currentTurn++;
    if (battle.currentTurn >= battle.turnOrder.length) {
      battle.currentTurn = 0; // Reset to the first character for
      battle.roundNumber++;
    }
    return battle;
  }


}
