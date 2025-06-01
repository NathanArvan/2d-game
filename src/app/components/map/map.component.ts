import { Component, computed, OnInit, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';
import { ItemComponent } from "../item/item.component";
import { CharacterComponent } from "../character/character.component";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [ItemComponent, CharacterComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  characters = signal<Character[]>([]);
  items = signal<Item[]>([]);
  selectedCharacter = signal<Character | null>(null);
  
  gridSize: number = 10; // Adjust as needed

  
  grid = computed<(Character | Item | null)[][]>(() => {
    const grid = this.initializeGrid();

    this.items().forEach(item => {
      this.setCellItem(item.position.x, item.position.y, item);
    });

    this.characters().forEach(character => {
      this.setCellCharacter(character.position.x, character.position.y, character);
    });

    return grid;
  })

  constructor(private gameService: GameService) { }

   ngOnInit(): void {
    this.initializeGrid();
    this.loadGame();
  }

  initializeGrid(): any[] {
    let grid = new Array(this.gridSize);
    for (let y = 0; y < this.gridSize; y++) {
      grid[y] = [];
      for (let x = 0; x < this.gridSize; x++) {
        grid[y][x] = null;
      }
    }
    return grid;
  }

  loadGame() {
    this.characters.set(this.gameService.getCharacters());

    this.items.set(this.gameService.getItems());
 
  }

  getCellCharacter(x: number, y: number): Character | null {
    return this.grid()[y][x] as Character;
  }

  getCellItem(x: number, y: number): Item | null {
    return this.grid()[y][x] as Item;
  }

  setCellCharacter(x: number, y: number, character: Character) {
    this.grid()[y][x] = character;
  }

  setCellItem(x: number, y: number, item: Item) {
    this.grid()[y][x] = item;
  }

  moveCharacter(x: number, y: number) {
    let characterToMove = this.selectedCharacter();
    if (characterToMove === null) return;
    characterToMove.position = {x, y};
    const characters = this.characters();
    const index = characters.findIndex(character => character.id === characterToMove.id);
    if (index !== -1) characters[index] = { ...characters[index], position: {x, y} };
    this.characters.set(characters);
  }

  isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize;
  }
}
