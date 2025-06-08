import { Character } from "./character.model";

export interface Battle {
    characterIdTurnOrder: number[];
    roundNumber: number;
    currentTurn: number;
}