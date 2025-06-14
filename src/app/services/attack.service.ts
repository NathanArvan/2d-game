import { Injectable } from '@angular/core';
import { Attack } from '../models/action.model';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor() { }

  attackAgainstArmorClass(attack: Attack, target: Character): {updatedTarget : Character, message: string} {

    const attackIsSuccessful = attack.calculatedIfSuccess(target);
    if (!attackIsSuccessful) {
      return { updatedTarget: target, message: 'Attack failed' };
    }
    // Calculate damage based on the attack's effectOnSuccess method
    const damage = attack.effectOnSuccess();
    target.health = target.health - damage;
    return { updatedTarget: target, message: `You attacked ${target.name} for ${damage} damage` };
  }
}
