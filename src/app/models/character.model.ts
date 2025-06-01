export interface Character {
    id: number;
    name: string;
    health: number;
    mana: number;
    position: { x: number; y: number };
}