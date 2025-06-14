import { Character } from "./character.model";
import { TokenType } from "./token.model";

export interface Action {
    id: number;
    name: string;
    cost: number;
    range: number;
    type: ActionType;
    targetType: TokenType | null;
}

export interface Attack extends Action {
  calculatedIfSuccess: (target: Character) => boolean; // roll to attack
  effectOnSuccess: () => number; // roll for damage
}

export enum ActionType {
  MOVE,
  ATTACK,
  INTERACT,
  USE_ITEM,
  BUFF,
  DEBUFF,
}
