import { Injectable } from '@angular/core';
import { ClassLevels } from '../models/character.model';
import { ActionService } from './action.service';
import { Classes } from '../permanent-data/classes';
import { Class } from '../models/class.model';
import { Action } from '../models/action.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private _classes = Classes;

  constructor(private actionService: ActionService) { }

  public getActionsForCharacterLevels(levels: ClassLevels[]): Action[] {
    const actions: Action[] = [];
    levels.forEach(level => {
      const classLevel = level.level;
      const playerClass = this.getClassById(level.classId);
      if (playerClass !== null) {
        const classActions = this.getUnlockedClassActions(playerClass, classLevel);
        actions.push(...classActions);
      }
    });
    return actions;
  }

  public getClassById(id: number): Class | null {
    return this._classes.find(c => c.id === id) || null;
  }

  public getUnlockedClassActions(playerClass: Class, level: number): Action[] {
    const unlockedActions: Action[] = [];
    playerClass.actions.forEach(action => {
      if (action.levelRestriction <= level) {
        const act = this.actionService.getActionById(action.actionId);
        if(act !== null)
        unlockedActions.push(act);
      }
    });
    return unlockedActions;
  }
}
