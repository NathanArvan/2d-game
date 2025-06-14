import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCellComponent } from './map-cell.component';

describe('MapCellComponent', () => {
  let component: MapCellComponent;
  let fixture: ComponentFixture<MapCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapCellComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
