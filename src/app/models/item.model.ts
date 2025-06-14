import { Action } from "./action.model";
import { DiceType } from "./dice.model";

export interface ItemInstance extends ItemTemplate{
    id: number;
    position: { x: number; y: number } | null;
}

export interface ItemTemplate {
    templateId: number;
    actionIds: number[];
    name: string;
    description: string;
    effect: Effect | null;
}

export interface Effect {
    type: EffectType;
    amount: {
        diceCount: number;
        diceType: DiceType;
    }
}

export enum EffectType {
    Damage,
    Healing
}