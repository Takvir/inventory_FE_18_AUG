import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetBranchComponent } from './asset-branch.component';

describe('AssetBranchComponent', () => {
  let component: AssetBranchComponent;
  let fixture: ComponentFixture<AssetBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetBranchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
