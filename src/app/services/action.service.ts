import { Injectable } from '@angular/core';
import { Actions } from '../permanent-data/actions';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private _actions = Actions;
  constructor() { }

  getActionById(id: number): Action | null {
    return this._actions.find(action => action.id === id) || null;
  }
}
