import { Action, ActionStates } from "../models/action";
import { Character } from "../models/character.model";
import { Item } from "../models/item.model";
import { Location } from "../models/location.model";

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
    },
]

export const mockItems: Item[] = [
    {
        id: 1,
        name: 'Potion',
        description: 'Heals the user for 50 health points.',
        position: { x: 6, y: 4},
        actions: [],
    },
    {
        id: 2,
        name: 'Sword',
        description: 'A sharp sword that deals damage to enemies.',
        position: { x: 1, y: 8},
        actions: []
    },
    {
        id: 3,
        name: 'Shield',
        description: 'Protects the user from incoming attacks.',
        position: { x: 9, y: 7},
        actions: []
    },
]

export const mockMap: Location = {
    width: 10,
    height: 10,
    name: 'Grassland',
    id: 2
}

export const mockActions: Action[] =[
    {
        name: "Move",
        cost: 1,
        range: 3,
        state: ActionStates.MoveSelected,
    },
    {
        name: "Melee Attack",
        cost: 1,
        range: 1,
        state: ActionStates.AttackSelected,
    },
    {
        name: "Pick up Item",
        cost: 1,
        range: 1,
        state: ActionStates.ItemPickUpSelected,
    }
];