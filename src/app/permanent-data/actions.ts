import { Action, ActionStates } from "../models/action";

export const Actions: Action[] =    [{
    id: 1,
    name: "Move",
    cost: 1,
    range: 3,
    state: ActionStates.MoveSelected,
},
{
    id: 2,
    name: "Melee Attack",
    cost: 1,
    range: 1,
    state: ActionStates.AttackSelected,
},
{
    id: 3,
    name: "Pick up Item",
    cost: 1,
    range: 1,
    state: ActionStates.ItemPickUpSelected,
},
{
    id: 4,
    name: "Drink Potion",
    cost: 1,
    range: 0,
    state: ActionStates.UseItemSelected,
},
{
    id: 5,
    name: "Raise Shield",
    cost: 1,
    range: 0,
    state: ActionStates.UseItemSelected,
},{
    id: 6,
    name: "Power Attack",
    cost: 2,
    range: 1,
    state: ActionStates.AttackSelected,
},
{
    id: 7,
    name: "Ether Shot",
    cost: 2,
    range: 3,
    state: ActionStates.AttackSelected,
},{
    id: 8,
    name: "Sneak Attack",
    cost: 1,
    range: 1,
    state: ActionStates.AttackSelected,
},
{
    id: 9,
    name: "Ranged Attack",
    cost: 2,
    range: 3,
    state: ActionStates.AttackSelected,
},{
    id: 10,
    name: "Encourage Ally",
    cost: 2,
    range: 3,
    state: ActionStates.AttackSelected,
}
];