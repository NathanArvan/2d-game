import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BattleMapUiComponent } from './battle-map-ui.component';

describe('BattleMapUiComponent', () => {
  let component: BattleMapUiComponent;
  let fixture: ComponentFixture<BattleMapUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BattleMapUiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BattleMapUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
