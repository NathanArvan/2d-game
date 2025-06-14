import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiativeBarComponent } from './initiative-bar.component';

describe('InitiativeBarComponent', () => {
  let component: InitiativeBarComponent;
  let fixture: ComponentFixture<InitiativeBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitiativeBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitiativeBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
