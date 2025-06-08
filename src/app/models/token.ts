import { Character } from "./character.model";
import { ItemInstance } from "./item.model";

export interface Token {
    content: Character | ItemInstance;
    type: TokenType;
}

export enum TokenType {
    CHARACTER,
    ITEM
}