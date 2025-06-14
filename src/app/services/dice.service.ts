import { Injectable } from '@angular/core';
import { DiceType } from '../models/dice.model';

@Injectable({
  providedIn: 'root'
})
export class DiceService {

  constructor() { }

  rollDice(type: DiceType, numberOfDice: number): number {
    let total = 0;
    for (let i = 0; i < numberOfDice; i++) {
      total += this.rollDie(type);
    }
    return total;
  }

  rollDie(type: DiceType) {
    return Math.floor(Math.random() * type) + 1;
  }


}
