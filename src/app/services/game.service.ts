import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Item } from '../models/item.model';
import { Location } from '../models/location.model';
import { mockCharacters, mockItems, mockMap } from '../mockData/mockBattleData';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  initializeMockData() {
    const characters = mockCharacters
    this.saveCharacters(characters);
    const items = mockItems;
    this.saveItem(items);
    const location = mockMap;
    this.saveLocation(location);
  }

  saveCharacters(characters: Character[]): void {
    localStorage.setItem('characters', JSON.stringify(characters));
  }

  getCharacters(): Character[] {
    const characters = localStorage.getItem('characters');
    return characters ? JSON.parse(characters) : [];
  }

  saveItem(items: Item[]): void {
    localStorage.setItem('items', JSON.stringify(items));
  }
  getItems(): Item[] {
    const items = localStorage.getItem('items');
    return items ? JSON.parse(items) : [];
  }

  saveLocation(location: Location): void {
    localStorage.setItem('location', JSON.stringify(location));
  }
  getLocation(): Location | null {
    const locationString = localStorage.getItem('location');
    if (locationString) {
      return JSON.parse(locationString);
    } else {
      return null;
    }
  }
}
