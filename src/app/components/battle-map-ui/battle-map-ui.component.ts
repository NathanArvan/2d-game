import { Component, OnInit } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-battle-map-ui',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './battle-map-ui.component.html',
  styleUrl: './battle-map-ui.component.css'
})
export class BattleMapUiComponent implements OnInit {

  constructor(private gameService: GameService) { 
    this.gameService.initializeMockData();
  }

  ngOnInit(): void {
    
  }

}
