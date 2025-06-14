import { Character } from "../models/character.model";
import { ItemInstance } from "../models/item.model";
import { Location, Obstacle } from "../models/location.model";
import { items } from "../permanent-data/items";

export const mockCharacters: Character[] = [
    {
        id: 1,
        name: 'John',
        health: 100,
        currentHealth: 100,
        mana: 0,
        armorClass: 15,
        position: { x: 5, y: 7},
        actionsPerTurn: 3,
        items: [],
        equippedWeapon: null,
        levels: [{
            level: 1,
            classId:1,
        }],
        stats: {
            strength: 2,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    },
    {
        id: 2,
        name: 'Jane',
        health: 80,
        currentHealth: 80,
        mana: 30,
        armorClass: 13,
        position: { x: 6, y: 9},
        actionsPerTurn: 3,
        items: [],
        
        equippedWeapon: null,
        levels: [{
            level: 1,
            classId:2,
        }],
        stats: {
            strength: 1,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    },
    {
        id: 3,
        name: 'Mike',
        health: 75,
        currentHealth: 75,
        mana: 20,
        armorClass: 11,
        position: { x: 8, y: 6},
        actionsPerTurn: 3,
        items: [],
        equippedWeapon: null,
        levels: [{
            level: 1,
            classId:3,
        }],
        stats: {
            strength: 0,
            dexterity: 2,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    },
    {
        id: 4,
        name: 'Sarah',
        health: 90,
        currentHealth: 90,
        armorClass: 17,
        mana: 10,
        position: { x: 3, y: 2},
        actionsPerTurn: 3,
        items: [],
        equippedWeapon: null,
        levels: [{
            level: 1,
            classId:4,
        }],
        stats: {
            strength: 1,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            wisdom: 0,
            charisma: 0
        }
    },
]

const itemData = items;

export const mockItems: ItemInstance[] = [
    {
        id: 1,
        position: { x: 6, y: 4},
        ...itemData[0],

    },
    {
        id: 2,
        position: { x: 1, y: 8},
        ...itemData[1],
    },
    {
        id: 3,
        position: { x: 9, y: 7},
        ...itemData[2],
    },
]

const mockObstacles: Obstacle[] = [{
    length : 2,
    width : 2,
    startingX: 15,
    startingY: 17,
}, {
    length : 22,
    width: 1,
    startingX: 12,
    startingY: 0
}]

export const mockMap: Location = {
    width: 30,
    height: 30,
    name: 'Grassland',
    id: 2,
    obstacles: mockObstacles,
}
