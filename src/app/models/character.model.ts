export interface Character {
    id: number;
    name: string;
    currentHealth: number;
    health: number;
    mana: number;
    position: { x: number; y: number };
    actionsPerTurn: number;
}