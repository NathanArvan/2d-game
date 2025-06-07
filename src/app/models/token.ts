import { Character } from "./character.model";
import { Item } from "./item.model";

export interface Token {
    content: Character | Item;
    type: TokenType;
}

export enum TokenType {
    CHARACTER,
    ITEM
}