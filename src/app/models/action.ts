export interface Action {
    id: number;
    name: string;
    cost: number;
    range: number;
    state: ActionStates;
}

export enum ActionStates {
  NoSelection,
  MoveSelected,
  AttackSelected,
  ItemPickUpSelected,
  UseItemSelected,
}
