import { Character } from "./character.model";

export interface Battle {
    turnOrder: Character[];
    roundNumber: number;
    currentTurn: number;
}