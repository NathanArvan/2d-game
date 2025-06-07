import { Component, input } from '@angular/core';
import { Token } from '../../models/token';

@Component({
  selector: 'app-token',
  standalone: true,
  imports: [],
  templateUrl: './token.component.html',
  styleUrl: './token.component.css'
})
export class TokenComponent {
  token = input<Token | null>();
}
