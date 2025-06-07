import { Component, computed, OnInit, signal } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character.model';
import { Item } from '../../models/item.model';
import { Location } from '../../models/location.model';
import { Action, ActionStates } from '../../models/action';
import { mockActions } from '../../mockData/mockBattleData';
import { Battle } from '../../models/turn.model';
import { BattleService } from '../../services/battle.service';

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
  actionState = signal<ActionStates>(ActionStates.NoSelection);
  actions: Action[] = [];
  actionStates = ActionStates;
  battle = signal<Battle | null>(null);
  remainingActionsInTurn = signal<number>(0);


  currentCharacter = computed(() => {
    const battleState = this.battle();

    if (battleState) {
      const currentTurn = battleState.currentTurn;
      return battleState.turnOrder[currentTurn];
    }
    return null;
  });

  constructor(
    private gameService: GameService,
    private battleService: BattleService
  ) { 
    this.gameService.initializeMockData();
  }

  ngOnInit(): void {
    this.characters.set(this.gameService.getCharacters());
    this.items.set(this.gameService.getItems());
    const location = this.gameService.getLocation();
    if (location) {
      this.location.set(location); 
    }
    this.actions = mockActions;
    this.battle.set(this.battleService.createBattle(this.characters()));
    this.remainingActionsInTurn.set(this.currentCharacter()?.actionsPerTurn ?? 0);
  }

  onBattleCellClicked(event: {x: number, y: number}): void {
    if (this.actionState() === ActionStates.MoveSelected) {
      this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
      this.moveCharacter(event.x, event.y);
      this.actionState.set(ActionStates.NoSelection);
    }

    if(this.actionState() === ActionStates.AttackSelected){
      this.attackCharacter(event.x, event.y)
      this.actionState.set(ActionStates.NoSelection);
    }

    if(this.actionState() === ActionStates.ItemPickUpSelected){
      this.pickUpItem(event.x, event.y);
      this.actionState.set(ActionStates.NoSelection);
    }
  }

  selectAction(action: Action) {
    this.actionState.set(action.state);
  }

  moveCharacter(x: number, y: number) {
    const currentCharacterId = this.currentCharacter()?.id
    const characters  = this.characters();
    const characterIndex = characters.findIndex((character) => character.id === currentCharacterId);
    if (characterIndex !== -1) {
      characters[characterIndex].position = { x, y };
    }
    console.log(characters[characterIndex])

    this.characters.set([...characters]);

  }

  pickUpItem(x: number, y: number) {

  }

  attackCharacter(x: number, y: number) {}

  cancelAction() {
    this.actionState.set(ActionStates.NoSelection);
  }

  endTurn() {
    const currentBattle = this.battle();
    if (currentBattle) {
      const updatedBattle = this.battleService.endTurn(currentBattle);
      const newBattle: Battle = {
        turnOrder: updatedBattle.turnOrder,
        roundNumber: updatedBattle.roundNumber,
        currentTurn: updatedBattle.currentTurn,
      }
      this.battle.set(newBattle);
      this.remainingActionsInTurn.set(this.currentCharacter()?.actionsPerTurn ?? 3);
    }      
  }

}
