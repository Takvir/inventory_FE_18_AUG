import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetAllComponent } from './asset-all.component';

describe('AssetAllComponent', () => {
  let component: AssetAllComponent;
  let fixture: ComponentFixture<AssetAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
