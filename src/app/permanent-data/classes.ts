import { Class } from "../models/class.model";

export const Classes: Class[] = [
    {
        id: 1,
        name: "Warrior",
        actions: [
        //     {
        //     actionId: 6,
        //     levelRestriction: 1
        // }
    ]
    },
    {
        id: 2,
        name: "Mage",
        actions: [{
            actionId: 7,
            levelRestriction: 1
        }]
    },
    {
        id: 3,
        name: "Rogue",
        actions: [{
            actionId: 8,
            levelRestriction: 1
        }]
    },
    {
        id: 4,
        name: "Ranger",
        actions: [{
            actionId: 9,
            levelRestriction: 1
        }]
    },
    {
        id: 5,
        name: "Bard",
        actions: [{
            actionId: 10,
            levelRestriction: 1
        }]
    },
]