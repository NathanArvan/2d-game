import { Component, computed, OnInit, signal } from '@angular/core';
import { MapComponent } from "../map/map.component";
import { GameService } from '../../services/game.service';
import { Character } from '../../models/character.model';
import { ItemInstance } from '../../models/item.model';
import { Location } from '../../models/location.model';
import { Action, ActionType } from '../../models/action.model';
import { BattleService } from '../../services/battle.service';
import { CharacterService } from '../../services/character.service';
import { ClassService } from '../../services/class.service';
import { AttackService } from '../../services/attack.service';
import { TurnState } from '../../models/turn.model';

enum ActionStates {
  NoSelection,
  MoveSelected,
  AttackSelected,
  InteractSelected,
  UseItemSelected,
  BuffSelected,
}


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
  battleState = signal<TurnState | null>(null);
  remainingActionsInTurn = signal<number>(0);
  log = signal<string[]>([]);
  actionTypes = ActionType;


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
    const battleState = this.battleState();
    const characters = this.characters();

    if (battleState) {
      const currentTurn = battleState.currentTurn;
      const currentTurnCharacterId = battleState.characterIdTurnOrder[currentTurn];
      const character = characters.find(c => c.id === currentTurnCharacterId);
      console.log(character)
      if (character) {
        return {...character};
      }
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
    private attackService: AttackService,

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
    this.battleState.set(this.battleService.createBattle(this.characters().map(ch => ch.id)));
    this.remainingActionsInTurn.set(this.currentCharacter()?.actionsPerTurn ?? 0);
  }

  onBattleCellClicked(event: {x: number, y: number}): void {
    if (this.actionState() === ActionStates.MoveSelected) {
      this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
      this.moveCharacter(event.x, event.y);
      this.clearAction();
    }

    if(this.actionState() === ActionStates.AttackSelected){
      this.processAttackAtTarget(event);
    }

    if(this.actionState() === ActionStates.InteractSelected){
      const itemIdAtPosition = this.getItemIdAtPosition(event.x,event.y)
      if(itemIdAtPosition) {
        this.pickUpItem(itemIdAtPosition);
        this.clearAction();
        this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
      }
    }
  }

  processAttackAtTarget(event: {x: number, y: number}): void {
    const characterIdAtPosition = this.getCharacterIdAtPosition(event.x,event.y)
      if(characterIdAtPosition) {
        this.attackCharacter(characterIdAtPosition)
        this.clearAction();
        this.remainingActionsInTurn.set(this.remainingActionsInTurn() - 1);
    } else {
      this.updateLog('No character at position')
    }
  }

  attackCharacter(characterId: number) {
    const attackedCharacterIndex = this.characters().findIndex(character => character.id === characterId);
    const currentCharacter = this.currentCharacter();
    if (attackedCharacterIndex !== -1 && currentCharacter) {
       const characterList = this.characters();
       const targetCharacter =characterList[attackedCharacterIndex];
       let result: {message: string, updatedTarget: Character} | null = null;
       //const currentWeapon = this.currentCharacter()?.equippedWeapon;
      const currentWeapon = this.currentCharacter()?.items[0];
      if (this.selectedAction()?.id === 11) {
          result = this.attackService.attackBareHanded(currentCharacter, targetCharacter);
       } else if (currentWeapon) {
          result = this.attackService.attackWithWeapon(currentCharacter, currentWeapon, targetCharacter);
       }
       if (!result) return;
       
       characterList[attackedCharacterIndex] = result.updatedTarget;
       this.characters.set([...characterList]);
       this.updateLog(result.message);
    }
  }

  getCharacterIdAtPosition(x: number, y: number): number | null {
    const character = this.characters().find(character => character.position.x === x && character.position.y === y)
    if (character) {
      return character.id;
    }
    return null;
  }



  selectAttack(action: Action) {
    this.actionState.set(ActionStates.AttackSelected);
    this.selectedAction.set(action);
  }

  selectMove(action: Action) {
    this.actionState.set(ActionStates.MoveSelected);
    this.selectedAction.set(action);
  }

  selectInteract(action: Action) {
    this.actionState.set(ActionStates.InteractSelected);
    this.selectedAction.set(action);
  }

  selectUseItem(action: Action) {
    this.actionState.set(ActionStates.UseItemSelected);
    this.selectedAction.set(action);
  }

  selectBuff(action: Action) {
    this.actionState.set(ActionStates.BuffSelected);
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
      this.updateLog(`Picked up ${item.name} from the ground.`)
    }
  }

  getItemIdAtPosition(x: number, y: number): number | null {
    const item = this.items().find(item => item.position?.x === x && item.position?.y === y);
    if (item) {
      return item.id;
    }
    return null; 
  }

  clearAction() {
    this.actionState.set(ActionStates.NoSelection);
    this.selectedAction.set(null);
  }

  endTurn() {
    this.clearAction();
    const currentBattle = this.battleState();
    if (currentBattle) {
      const updatedBattle = this.battleService.endTurn(currentBattle);
      const newBattle: TurnState = {
        characterIdTurnOrder: updatedBattle.characterIdTurnOrder,
        roundNumber: updatedBattle.roundNumber,
        currentTurn: updatedBattle.currentTurn,
      }
      this.battleState.set(newBattle);
      this.remainingActionsInTurn.set(this.currentCharacter()?.actionsPerTurn ?? 3);
    }      
  }

  updateLog(message: string) {
    const log = this.log();
    if (log) {
      log.push( message );
    }
    this.log.set(log);
  }
  
}
