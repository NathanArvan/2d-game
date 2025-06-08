import { Action } from "./action";

export interface Class {
    id: number;
    name: string;
    actions: ClassAction[];
}

export interface ClassAction {
    action: Action
    levelRestriction: number;
}