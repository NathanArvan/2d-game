import { DiceType } from "../models/dice.model";
import { EffectType, ItemTemplate } from "../models/item.model";

export const items: ItemTemplate[] = [
    {
        templateId: 1,
        name: 'Potion',
        description: 'Heals the user for 50 health points.',
        actionIds: [4],
        effect: {
            type: EffectType.Healing,
            amount: {
                diceCount: 1,
                diceType: DiceType.D8
            }
        }
        

    },
    {
        templateId: 2,
        name: 'Sword',
        description: 'A sharp sword that deals damage to enemies.',
        actionIds: [2],
        effect: {
            type: EffectType.Damage,
            amount: {
                diceCount: 1,
                diceType: DiceType.D8
            }
        }
    },
    {
        templateId: 3,
        name: 'Shield',
        description: 'Protects the user from incoming attacks.',
        actionIds: [5],
        effect: null,
    },
]