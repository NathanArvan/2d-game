export enum DiceType {
    D4 = 4,
    D6 = 6,
    D8 = 8,
    D10 = 10,
    D12 = 12,
    D20 = 20
}

export interface DieRoll {
    type: DiceType;
    quantity: number;
}