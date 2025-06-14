import { Injectable } from '@angular/core';
import { ClassService } from './class.service';
import { ItemService } from './item.service';
import { Character, ClassLevels } from '../models/character.model';
import { Action, ActionType } from '../models/action.model';
import { ActionService } from './action.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private classService: ClassService,
    private itemService: ItemService,
    private actionService: ActionService
  ) { }

  getCharacterActions(character: Character): {actionType: ActionType, actions: Action[]}[] {
    const classActions = this.getCharacterClassActions(character.levels);
    const itemIds = character.items.map(item => item.templateId);
    const itemsActions = this.getCharacterItemActions(itemIds);
    const moveActions = this.getMoveActions();
    const commonActions = this.getCommonActions();
    const totalActions = classActions.concat(itemsActions).concat(moveActions).concat(commonActions);
    const attacks = {actionType: ActionType.ATTACK, actions: totalActions.filter(action => action.type === ActionType.ATTACK)};
    const moves = {actionType: ActionType.MOVE, actions: totalActions.filter(action => action.type === ActionType.MOVE)};
    const buffs = {actionType: ActionType.BUFF, actions: totalActions.filter(action => action.type === ActionType.BUFF)};
    const interacts = {actionType: ActionType.INTERACT, actions: totalActions.filter(action => action.type === ActionType.INTERACT)};
    const uses = {actionType: ActionType.USE_ITEM, actions: totalActions.filter(action => action.type === ActionType.USE_ITEM)};
    return [attacks, moves, buffs, interacts, uses];
  }

  getCharacterClassActions(levels: ClassLevels[]): Action[] {
    return this.classService.getActionsForCharacterLevels(levels);
  }

  getCharacterItemActions(itemIds: number[]): Action[] {
    let actions: Action[] = [];
    itemIds.forEach(id => {
      const itemActions = this.itemService.getItemActionsById(id);
      if (itemActions.length > 0) {
        actions = [...actions, ...itemActions];
      }
    })
    return actions;
  }

  getMoveActions() : Action[] {
    const moveAction = this.actionService.getActionById(1);
    if(moveAction){
      return [moveAction];
    } else{
      return [];
    }
  }

  getCommonActions() : Action[] {
    let actions: Action[] = [];
    const pickUpItem = this.actionService.getActionById(3);
    if(pickUpItem){
      actions.push(pickUpItem)
    }
    const unarmedAttack = this.actionService.getActionById(11);
    if(unarmedAttack){
      actions.push(unarmedAttack)
    }
    return actions;
  }
}
