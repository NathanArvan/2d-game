import { Component, OnInit } from '@angular/core';
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
  grid: (Character | Item | null)[][] = [];
  gridSize: number = 10; // Adjust as needed

  constructor(private gameService: GameService) { }

   ngOnInit(): void {
    this.initializeGrid();
    this.loadGame();
  }

  initializeGrid() {
    for (let y = 0; y < this.gridSize; y++) {
      this.grid[y] = [];
      for (let x = 0; x < this.gridSize; x++) {
        this.grid[y][x] = null;
      }
    }
  }

  loadGame() {
    const characters = this.gameService.getCharacters();
    characters.forEach(character => {
      this.setCellCharacter(character.position.x, character.position.y, character);
    });

    const items =this.gameService.getItems();
    items.forEach(item => {
      this.setCellItem(item.position.x, item.position.y, item);
    });
  }

  getCellCharacter(x: number, y: number): Character | null {
    return this.grid[y][x] as Character;
  }

  getCellItem(x: number, y: number): Item | null {
    return this.grid[y][x] as Item;
  }

  setCellCharacter(x: number, y: number, character: Character) {
    this.grid[y][x] = character;
  }

  setCellItem(x: number, y: number, item: Item) {
    this.grid[y][x] = item;
  }

  moveCharacter(x: number, y: number) {
  // const selectedCharacter = this.getCellCharacter(this.selectedX, this.selectedY);
  // if (selectedCharacter && this.isWithinBounds(x, y)) {
  //   this.gameService.moveCharacter(selectedCharacter.id, { x, y }).subscribe(() => {
  //     // Update the character's position in the grid
  //     this.setCellCharacter(this.selectedX, this.selectedY, null);
  //     this.setCellCharacter(x, y, selectedCharacter);
  //     this.selectedX = x;
  //     this.selectedY = y;
  //   });
  // }
}

isWithinBounds(x: number, y: number): boolean {
  return x >= 0 && x < this.gridSize && y >= 0 && y < this.gridSize;
}
}
