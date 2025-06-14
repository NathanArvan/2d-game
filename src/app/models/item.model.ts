import { Action } from "./action.model";
import {  DieRoll } from "./dice.model";

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
    amount: DieRoll;
}

export enum EffectType {
    Damage,
    Healing
}