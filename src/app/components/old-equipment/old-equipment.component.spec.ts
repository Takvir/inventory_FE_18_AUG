import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldEquipmentComponent } from './old-equipment.component';

describe('OldEquipmentComponent', () => {
  let component: OldEquipmentComponent;
  let fixture: ComponentFixture<OldEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OldEquipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
