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
    stats: Stats;
}

export interface ClassLevels {
    level: number;
    classId: number;
}

export interface Stats {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}