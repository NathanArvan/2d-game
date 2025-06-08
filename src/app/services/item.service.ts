import { Injectable } from '@angular/core';
import { items } from '../permanent-data/items';
import { ActionService } from './action.service';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private _itemTemplates = items;

  constructor(private actionService: ActionService) { }

  getItemActionsById(id: number): Action[] {
    const actions: Action[] = [];
    const found = this._itemTemplates.find(item => item.templateId === id);
    if (found) {
      for (const action of found.actionIds) {
        const actionFound = this.actionService.getActionById(action);
        if(actionFound != null)
        actions.push(actionFound)
      }
    }
    return actions;
  }
}
