import { Injectable } from '@angular/core';
import { ClassService } from './class.service';
import { ItemService } from './item.service';
import { Character, ClassLevels } from '../models/character.model';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private classService: ClassService,
    private itemService: ItemService
  ) { }

  getCharacterActions(character: Character): Action[] {
    const classActions = this.getCharacterClassActions(character.levels);
    const itemsActions = this.getCharacterItemActions(character.items.map(item => item.templateId));
    return classActions.concat(itemsActions);
  }

  getCharacterClassActions(levels: ClassLevels[]): Action[] {
    return this.classService.getActionsForCharacterLevels(levels);
  }

  getCharacterItemActions(itemIds: number[]): Action[] {
    const actions = [];
    for (let i in itemIds) {
      const itemActions = this.itemService.getItemActionsById(Number(i));
      if (itemActions.length > 0) {
        actions.push(...itemActions);
      }
    }
    return actions;
  }
}
