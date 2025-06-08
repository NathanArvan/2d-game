export interface Class {
    id: number;
    name: string;
    actions: ClassAction[];
}

export interface ClassAction {
    actionId: number;
    levelRestriction: number;
}