import { Component } from '@angular/core';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-battle-map-ui',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './battle-map-ui.component.html',
  styleUrl: './battle-map-ui.component.css'
})
export class BattleMapUiComponent {

}
