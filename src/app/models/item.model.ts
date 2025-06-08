import { Action } from "./action";

export interface ItemInstance extends ItemTemplate{
    id: number;
    position: { x: number; y: number } | null;
}

export interface ItemTemplate {
    templateId: number;
    actionIds: number[];
    name: string;
    description: string;
}