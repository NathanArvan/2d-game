import { TokenType } from "./token";

export interface Action {
    id: number;
    name: string;
    cost: number;
    range: number;
    state: ActionStates;
    targetType: TokenType | null;
}

export enum ActionStates {
  NoSelection,
  MoveSelected,
  AttackSelected,
  ItemPickUpSelected,
  UseItemSelected,
}
