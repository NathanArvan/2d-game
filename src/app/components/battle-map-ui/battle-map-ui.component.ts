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

  currentCharacter = computed(() => {
    const battleState = this.battle();
    console.log("hit computed");

    if (battleState) {
      console.log(battleState.currentTurn);
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
  }

  onBattleCellClicked(x: number, y: number): void {
    if (this.actionState() === ActionStates.MoveSelected) {
      this.moveCharacter();
      this.actionState.set(ActionStates.NoSelection);
    }

    if(this.actionState() === ActionStates.AttackSelected){
      this.attackCharacter()
      this.actionState.set(ActionStates.NoSelection);
    }

    if(this.actionState() === ActionStates.ItemPickUpSelected){
      this.pickUpItem();
      this.actionState.set(ActionStates.NoSelection);
    }
  }

  selectAction(action: Action) {
    this.actionState.set(action.state);
  }

  moveCharacter() {

  }

  pickUpItem() {

  }

  attackCharacter() {}

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
    }      
  }

}
