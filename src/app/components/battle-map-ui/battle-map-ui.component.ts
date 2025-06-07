import { Component, OnInit, signal } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-battle-map-ui',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './battle-map-ui.component.html',
  styleUrl: './battle-map-ui.component.css'
})
export class BattleMapUiComponent implements OnInit {

    characters = signal<Character[]>([]);
    items = signal<Item[]>([]);
    location = signal<Location>({ id: 0, name: '', width: 10, height: 10 });


  constructor(private gameService: GameService) { 
    this.gameService.initializeMockData();
  }

  ngOnInit(): void {
    this.characters.set(this.gameService.getCharacters());
    this.items.set(this.gameService.getItems());
    const location = this.gameService.getLocation(); // Get the current location in the game service
    if (location) {
      this.location.set(location); // Set the
    }
  }

}
