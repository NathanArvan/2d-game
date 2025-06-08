import { ItemTemplate } from "../models/item.model";

export const items: ItemTemplate[] = [
    {
        templateId: 1,
        name: 'Potion',
        description: 'Heals the user for 50 health points.',
        actionIds: [4],
    },
    {
        templateId: 2,
        name: 'Sword',
        description: 'A sharp sword that deals damage to enemies.',
        actionIds: [1]
    },
    {
        templateId: 3,
        name: 'Shield',
        description: 'Protects the user from incoming attacks.',
        actionIds: [5]
    },
]