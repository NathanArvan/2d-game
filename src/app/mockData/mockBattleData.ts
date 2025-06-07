import { Character } from "../models/character.model";
import { Item } from "../models/item.model";
import { Location } from "../models/location.model";

export const mockCharacters: Character[] = [
    {
        id: 1,
        name: 'John',
        health: 100,
        mana: 0,
        position: { x: 5, y: 7}
    },
    {
        id: 2,
        name: 'Jane',
        health: 80,
        mana: 30,
        position: { x: 6, y: 9}
    },
    {
        id: 3,
        name: 'Mike',
        health: 75,
        mana: 20,
        position: { x: 8, y: 6}
    },
    {
        id: 4,
        name: 'Sarah',
        health: 90,
        mana: 10,
        position: { x: 3, y: 2}
    },
]

export const mockItems: Item[] = [
    {
        id: 1,
        name: 'Potion',
        description: 'Heals the user for 50 health points.',
        position: { x: 6, y: 4}
    },
    {
        id: 2,
        name: 'Sword',
        description: 'A sharp sword that deals damage to enemies.',
        position: { x: 1, y: 8}
    },
    {
        id: 3,
        name: 'Shield',
        description: 'Protects the user from incoming attacks.',
        position: { x: 9, y: 7}
    },
]

export const mockMap: Location = {
    width: 10,
    height: 10,
    name: 'Grassland',
    id: 2
}