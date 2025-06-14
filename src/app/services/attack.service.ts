import { Injectable } from '@angular/core';
import { Attack } from '../models/action.model';
import { Character } from '../models/character.model';
import { DiceService } from './dice.service';
import { DiceType } from '../models/dice.model';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private diceService: DiceService) { }

  attackWithWeapon(attack: Attack, target: Character): {updatedTarget : Character, message: string} {
    const attackRoll = this.diceService.rollDie(DiceType.D20);
    const armorClass = target.armorClass;
    const attackIsSuccessful = attackRoll >= armorClass;
    if (!attackIsSuccessful) {
      return { updatedTarget: target, message: 'Attack failed' };
    }

    const damage = this.diceService.rollDie(DiceType.D8);
    target.health = target.health - damage;
    return { updatedTarget: target, message: `You attacked ${target.name} for ${damage} damage` };
  }
  
  drinkHealingPotion(target: Character): {updatedTarget : Character, message: string} {
    const healing = this.diceService.rollDice(DiceType.D4, 2) + 2;
    target.health += healing;
    return { updatedTarget: target, message: `${target.name} drank a healing potion and gained ${healing} health` };
  }
}
