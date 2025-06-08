import { Component, computed, OnInit, signal } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character.model';
import { ItemInstance } from '../../models/item.model';
import { Location } from '../../models/location.model';
import { Action, ActionStates } from '../../models/action';
import { Battle } from '../../models/turn.model';
import { BattleService } from '../../services/battle.service';
import { CharacterService } from '../../services/character.service';
import { ClassService } from '../../services/class.service';

@Component({
  selector: 'app-battle-map-ui',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './battle-map-ui.component.html',
  styleUrl: './battle-map-ui.component.css'
})
export class BattleMapUiComponent implements OnInit {

  characters = signal<Character[]>([]);
  items = signal<ItemInstance[]>([]);
  location = signal<Location>({ id: 0, name: '', width: 10, height: 10 });
  actionState = signal<ActionStates>(ActionStates.NoSelection);
  actionStates = ActionStates;
  battle = signal<Battle | null>(null);
  remainingActionsInTurn = signal<number>(0);
  selectedAction = signal<Action | null>(null);
  selectedActionContext = computed(() => {
    const action = this.selectedAction();
    const character = this.currentCharacter();
    if (character === null || action === null) {
      return null;
    }
    return {action, position: character.position}
  })

  currentCharacter = computed(() => {
    //TODO: need to have current character update when characters signal changes, like when picking up an item
    const battleState = this.battle();

    if (battleState) {
      const currentTurn = battleState.currentTurn;
      return battleState.turnOrder[currentTurn];
    }
    return null;
  });

  characterActions = computed(() => {
    const character = this.currentCharacter();
    if (!character) return [];
    const actions = this.characterService.getCharacterActions(character);
    return actions;
  })

  characterClasses = computed<{className: string, classLevel: number}[]>(() => {
    const character = this.currentCharacter();
    const classes: {className: string, classLevel: number}[] = [];
    if (!character) return [];
    character.levels.forEach(level => {
      const playerClass = this.classService.getClassById(level.classId);
      if (!playerClass) return;
      classes.push({ className: playerClass.name, classLevel: level.level });
    });
    return classes;
  })

  constructor(
    private gameService: GameService,
    private battleService: BattleService,
    private characterService: CharacterService,
    private classService: ClassService,
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
    this.battle.set(this.battleService.createBattle(this.characters()));
    this.remainingActionsInTurn.set(this.currentCharacter()?.actionsPerTurn ?? 0);
  }

  onBattleCellClicked(event: {x: number, y: number}): void {
    if (this.actionState() === ActionStates.MoveSelected) {
      this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
      this.moveCharacter(event.x, event.y);
      this.clearAction();
    }

    if(this.actionState() === ActionStates.AttackSelected){
      const characterIdAtPosition = this.getCharacterIdAtPosition(event.x,event.y)
      if(characterIdAtPosition) {
        this.attackCharacter(characterIdAtPosition)
        this.clearAction();
        this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
      }
    }

    if(this.actionState() === ActionStates.ItemPickUpSelected){
      const itemIdAtPosition = this.getItemIdAtPosition(event.x,event.y)
      if(itemIdAtPosition) {
        this.pickUpItem(itemIdAtPosition);
        this.clearAction();
        this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
      }
    }
  }

  selectAction(action: Action) {
    this.actionState.set(action.state);
    this.selectedAction.set(action);
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

  pickUpItem(itemId: number) {
    const item = this.items().find(item => item.id === itemId);
    const currentCharacter = this.currentCharacter();
    if (item && currentCharacter) {
      const items = this.items();
      items.splice(items.findIndex(item => item.id === itemId), 1);
      this.items.set([...items]); 

      const characters = this.characters();
      const characterIndex = characters.findIndex(character => character.id === currentCharacter.id);
      characters[characterIndex].items = [...characters[characterIndex].items, item]
      this.characters.set([...characters]);
    }
  }

  getItemIdAtPosition(x: number, y: number): number | null {
    const item = this.items().find(item => item.position?.x === x && item.position?.y === y);
    if (item) {
      return item.id;
    }
    return null; 
  }



  attackCharacter(characterId: number) {
    const attackedCharacterIndex = this.characters().findIndex(character => character.id === characterId);
    if (attackedCharacterIndex !== -1) {
       const characterList = this.characters();
       characterList[attackedCharacterIndex].currentHealth -= 10;
       this.characters.set([...characterList]);
    }


  }

  getCharacterIdAtPosition(x: number, y: number): number | null {
    const character = this.characters().find(character => character.position.x === x && character.position.y === y)
    if (character) {
      return character.id;
    }
    return null;
  }

  clearAction() {
    this.actionState.set(ActionStates.NoSelection);
    this.selectedAction.set(null);
  }

  endTurn() {
    this.clearAction();
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
