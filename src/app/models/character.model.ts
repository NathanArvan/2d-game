import { ItemInstance } from "./item.model";

export interface Character {
    id: number;
    name: string;
    currentHealth: number;
    health: number;
    mana: number;
    armorClass: number;
    position: { x: number; y: number };
    actionsPerTurn: number;
    items: ItemInstance[];
    equippedWeapon: ItemInstance | null;
    levels: ClassLevels[];
}

export interface ClassLevels {
    level: number;
    classId: number;
}