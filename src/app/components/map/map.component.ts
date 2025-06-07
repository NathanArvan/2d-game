import { Component, computed, EventEmitter, input, OnInit, Output } from '@angular/core';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';
import { Location } from '../../models/location.model';
import { TokenComponent } from "../token/token.component";
import { Token, TokenType } from '../../models/token';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [TokenComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  characters = input<Character[]>([]);
  items = input<Item[]>([]);
  location = input.required<Location>();
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

  constructor() { }

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
}
