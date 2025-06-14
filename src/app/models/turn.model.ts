import { Character } from "./character.model";

export interface TurnState {
    characterIdTurnOrder: number[];
    roundNumber: number;
    currentTurn: number;
}