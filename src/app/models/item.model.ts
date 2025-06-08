import { Action } from "./action";

export interface Item {
    id: number;
    name: string;
    description: string;
    position: { x: number; y: number } | null;
    actionIds: number[];
}