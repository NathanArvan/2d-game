export interface Location {
    id: number;
    name: string;
    width: number;
    height: number;
    obstacles: Obstacle[];
}

export interface Obstacle {
    length: number;
    width: number;
    startingX: number;
    startingY: number;
}
