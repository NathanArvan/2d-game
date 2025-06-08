import { Action, ActionStates } from "../models/action";
import { Character } from "../models/character.model";
import { ItemInstance } from "../models/item.model";
import { Location } from "../models/location.model";
import { items } from "../permanent-data/items";

export const mockCharacters: Character[] = [
    {
        id: 1,
        name: 'John',
        health: 100,
        currentHealth: 100,
        mana: 0,
        position: { x: 5, y: 7},
        actionsPerTurn: 3,
        items: [],
        levels: [{
            level: 1,
            classId:1,
        }]
    },
    {
        id: 2,
        name: 'Jane',
        health: 80,
        currentHealth: 80,
        mana: 30,
        position: { x: 6, y: 9},
        actionsPerTurn: 3,
        items: [],
        levels: [{
            level: 1,
            classId:2,
        }]
    },
    {
        id: 3,
        name: 'Mike',
        health: 75,
        currentHealth: 75,
        mana: 20,
        position: { x: 8, y: 6},
        actionsPerTurn: 3,
        items: [],
        levels: [{
            level: 1,
            classId:3,
        }]
    },
    {
        id: 4,
        name: 'Sarah',
        health: 90,
        currentHealth: 90,
        mana: 10,
        position: { x: 3, y: 2},
        actionsPerTurn: 3,
        items: [],
        levels: [{
            level: 1,
            classId:4,
        }]
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

export const mockMap: Location = {
    width: 10,
    height: 10,
    name: 'Grassland',
    id: 2
}
