import { Component, computed, input, OnInit, signal } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';
import { Location } from '../../models/location.model';
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
  characters = input<Character[]>([]);
  items = input<Item[]>([]);
  location = input.required<Location>();
  //selectedCharacter = signal<Character | null>(null);

  
  grid = computed<(Character | Item | null)[][]>(() => {
    const grid: (Character | Item | null)[][] = this.initializeGrid();

    this.items().forEach(item => {
      if (item.position)
      grid[item.position.x][item.position.y] = item
    });

    this.characters().forEach(character => {
      grid[character.position.x][character.position.y] = character;
    });

    return grid;
  })

  constructor(private gameService: GameService) { }

   ngOnInit(): void {
    this.initializeGrid();
    //this.loadGame();
  }

  initializeGrid(): any[] {
    let grid = new Array(this.location().width);
    for (let y = 0; y < this.location().width; y++) {
      grid[y] = [];
      for (let x = 0; x < this.location().height; x++) {
        grid[y][x] = null;
      }
    }
    console.log(grid);

    return grid;
  }

  // loadGame() {
  //   this.characters.set(this.gameService.getCharacters());

  //   this.items.set(this.gameService.getItems());
 
  // }

  getCellCharacter(x: number, y: number): Character | null {
    return this.grid()[y][x] as Character;
  }

  getCellItem(x: number, y: number): Item | null {
    return this.grid()[y][x] as Item;
  }


  moveCharacter(x: number, y: number) {
    // let characterToMove = this.selectedCharacter();
    // if (characterToMove === null) return;
    // characterToMove.position = {x, y};
    // const characters = this.characters();
    // const index = characters.findIndex(character => character.id === characterToMove.id);
    // if (index !== -1) characters[index] = { ...characters[index], position: {x, y} };
    //this.characters.set(characters);
  }

  isWithinBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.location().width  && y >= 0 && y < this.location().height;
  }
}
