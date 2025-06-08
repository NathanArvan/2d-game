import { Action, ActionStates } from "../models/action.model";
import { TokenType } from "../models/token.model";

export const Actions: Action[] =    [{
    id: 1,
    name: "Move",
    cost: 1,
    range: 3,
    state: ActionStates.MoveSelected,
    targetType: null,
},
{
    id: 2,
    name: "Melee Attack",
    cost: 1,
    range: 1,
    state: ActionStates.AttackSelected,
    targetType: TokenType.CHARACTER,
},
{
    id: 3,
    name: "Pick up Item",
    cost: 1,
    range: 1,
    state: ActionStates.ItemPickUpSelected,
    targetType: TokenType.ITEM,
},
{
    id: 4,
    name: "Drink Potion",
    cost: 1,
    range: 0,
    state: ActionStates.UseItemSelected,
    targetType: null,
},
{
    id: 5,
    name: "Raise Shield",
    cost: 1,
    range: 0,
    state: ActionStates.UseItemSelected,
    targetType: null,
},{
    id: 6,
    name: "Power Attack",
    cost: 2,
    range: 1,
    state: ActionStates.AttackSelected,
    targetType: TokenType.CHARACTER
},
{
    id: 7,
    name: "Ether Shot",
    cost: 2,
    range: 3,
    state: ActionStates.AttackSelected,
    targetType: TokenType.CHARACTER
},{
    id: 8,
    name: "Sneak Attack",
    cost: 1,
    range: 1,
    state: ActionStates.AttackSelected,
    targetType: TokenType.CHARACTER
},
{
    id: 9,
    name: "Ranged Attack",
    cost: 2,
    range: 3,
    state: ActionStates.AttackSelected,
    targetType: TokenType.CHARACTER
},{
    id: 10,
    name: "Encourage Ally",
    cost: 2,
    range: 3,
    state: ActionStates.AttackSelected,
    targetType: TokenType.CHARACTER
}
];