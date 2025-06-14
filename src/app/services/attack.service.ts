import { Injectable } from '@angular/core';
import { Attack } from '../models/action.model';
import { Character } from '../models/character.model';
import { DiceService } from './dice.service';
import { DiceType, DieRoll } from '../models/dice.model';
import { EffectType, ItemInstance } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private diceService: DiceService) { }

  attackWithWeapon(attacker: Character, weapon: ItemInstance, target: Character): {updatedTarget : Character, message: string} {
    const weaponEffect = weapon.effect;
    if (!weaponEffect || weaponEffect.type !== EffectType.Damage) {
      return { updatedTarget: target, message: 'Weapon does not have a damage effect.' };
    }
    return this.attackEnemy(attacker, target, weaponEffect.amount);
  }

  attackBareHanded(attacker: Character, target: Character): {updatedTarget : Character, message: string} {
    const damageRoll: DieRoll = {
      type: DiceType.D4,
      quantity: 1
    };
    return this.attackEnemy(attacker, target, damageRoll);
  }

  attackEnemy(attacker: Character, target: Character, damageToBeDealt: DieRoll): {updatedTarget : Character, message: string} {
    let message = '';

    const attackRoll = this.diceService.rollDie(DiceType.D20);
    const armorClass = target.armorClass;
    const strengthModifier = attacker.stats.strength;
    const attackTotal = attackRoll + strengthModifier;

    message = this.appendMessage(message, `Rolled a ${attackRoll} plus ${strengthModifier} modifier for a total of ${attackTotal} against targets armour class of ${armorClass}.`);

    const attackIsSuccessful = attackTotal >= armorClass;

    if (!attackIsSuccessful) {
      message = this.appendMessage(message, 'Attack failed')
      return { updatedTarget: target, message };
    }

    const damageRoll = this.diceService.rollDice(damageToBeDealt.type, damageToBeDealt.quantity);
    const damage = damageRoll + strengthModifier;
    message = this.appendMessage(message, `Rolled ${damageRoll} plus ${attacker.name}'s strength (${strengthModifier}) for ${damage} damage.`);

    target.currentHealth = target.currentHealth - damage;
    message = this.appendMessage(message, `${attacker.name} attacked ${target.name} for ${damage} damage.`);
    return { updatedTarget: target, message };
  }


  drinkHealingPotion(target: Character): {updatedTarget : Character, message: string} {
    const healing = this.diceService.rollDice(DiceType.D4, 2) + 2;
    target.health += healing;
    return { updatedTarget: target, message: `${target.name} drank a healing potion and gained ${healing} health` };
  }

  appendMessage(currentMessage: string, update: string): string {
    return currentMessage ? `${currentMessage}\n\n${update}` : update;
  }
}
