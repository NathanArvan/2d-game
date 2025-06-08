import { Component, input } from '@angular/core';
import { Token, TokenType } from '../../models/token.model';
import { TokenComponent } from "../token/token.component";

@Component({
  selector: 'app-map-cell',
  standalone: true,
  imports: [TokenComponent],
  templateUrl: './map-cell.component.html',
  styleUrl: './map-cell.component.css'
})
export class MapCellComponent {
  isInRange  = input<boolean>(false);
  isValidTarget = input<boolean>(false);
  token = input<Token | null>(null);

  getCellColor() {
    if (this.isValidTarget()) return 'green';
    if (this.isInRange()) return 'yellow';
    const token = this.token();
    if (token !== null) {
      if (token.type === TokenType.CHARACTER) return 'blue';
      if (token.type === TokenType.ITEM) return 'orange';
    }
    return 'grey';
  }
}
