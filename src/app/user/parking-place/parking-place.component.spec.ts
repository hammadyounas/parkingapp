import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingPlaceComponent } from './parking-place.component';

describe('ParkingPlaceComponent', () => {
  let component: ParkingPlaceComponent;
  let fixture: ComponentFixture<ParkingPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
