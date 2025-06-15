import { Component, computed, EventEmitter, input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/character.model';
import { Location } from '../../models/location.model';
import { Token, TokenType } from '../../models/token.model';
import { ItemInstance } from '../../models/item.model';
import { MapCellComponent } from "../map-cell/map-cell.component";
import { Action } from '../../models/action.model';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [MapCellComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  characters = input<Character[]>([]);
  items = input<ItemInstance[]>([]);
  location = input.required<Location>();
  actionContext = input<{action: Action, position: { x:number,y:number}} | null>(null);
  startingPoint = input<{ x:number,y:number} | null>(null);
  endingPoint = input<{ x:number,y:number} | null>(null);

  @Output() battleCellClicked = new EventEmitter<{ x:number,y:number}>();
  
  grid = computed<(Token| null)[][]>(() => {
    const grid: (Token | null)[][] = this.initializeGrid();

    this.items().forEach(item => {
      if (item.position)
      grid[item.position.x][item.position.y] = { content:item, type : TokenType.ITEM}
    });

    this.characters().forEach(character => {
      grid[character.position.x][character.position.y] = { content:character, type : TokenType.CHARACTER};
    });

    return grid;
  })

  constructor(private mapService: MapService) { }

   ngOnInit(): void {
    this.initializeGrid();
  }

  initializeGrid(): any[] {
    let grid = new Array(this.location().width);
    for (let y = 0; y < this.location().width; y++) {
      grid[y] = [];
      for (let x = 0; x < this.location().height; x++) {
        grid[y][x] = null;
      }
    }
    return grid;
  }

  getCellContent(x: number, y: number): Token | null {
    return this.grid()[x][y];
  }

  onBattleCellClicked(x: number, y: number) {
    this.battleCellClicked.emit({ x, y });
    console.log("cell clicked", x, y)
  }

  calculateIsInRange(x: number, y: number): boolean {
    const context = this.actionContext();
    if (context === null) return false;
    const distance = this.mapService.getDistanceInSquares(context.position, { x, y });
    return distance <= context.action.range;
  }

  calculateIsValidTarget(x: number, y: number): boolean {
    const context = this.actionContext();
    if (context === null) return false;
    if(!this.calculateIsInRange(x,y)) return false;
    const cellContent = this.getCellContent(x, y);
    if (cellContent === null) return false;
    return cellContent.type === context.action.targetType;
  }

  calculateIsObstacle(x: number, y: number): boolean {
    const obstacles = this.location().obstacles;
    for (const obstacle of obstacles) {
      if (
        x >= obstacle.startingX &&
        x < obstacle.startingX + obstacle.width &&
        y >= obstacle.startingY &&
        y < obstacle.startingY + obstacle.length
      ) {
        return true;
      }
    }
    return false;
  }

  calculateIsInLine(x: number, y: number): boolean {
    const startingPoint = this.startingPoint();
    if (startingPoint === null) return false;
    const endingPoint = this.endingPoint();
    if (endingPoint === null) return false;
    return this.mapService.getIsBetweenTwoPoints(startingPoint, endingPoint, { x: x + 0.5, y: y + 0.5 });
  }

}
