import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FranchiseViewComponent } from './franchise-view.component';

describe('FranchiseViewComponent', () => {
  let component: FranchiseViewComponent;
  let fixture: ComponentFixture<FranchiseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
