import { TestBed } from '@angular/core/testing';

import { BattleService } from './battle.service';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getCharacterIdAtTurn', () => {
    it('should return the character ID at the given turn index', () => {
      const characters = [
        3, 4, 1, 7
      ];
      const battleService = service.createBattle(characters);
      const expected = characters[0];
      expect(service.getCharacterIdAtTurn(battleService, 0)).toEqual(expected);
    });

    it('should return the character ID for a turn index greater then the number of characters', () => {
      const characters = [
        3, 4, 1, 7
      ];
      const battleService = service.createBattle(characters);
      const expected = characters[0];
      expect(service.getCharacterIdAtTurn(battleService, 4)).toEqual(expected);
    });

  })
});
