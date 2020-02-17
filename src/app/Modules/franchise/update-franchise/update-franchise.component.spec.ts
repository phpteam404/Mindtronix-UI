import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFranchiseComponent } from './update-franchise.component';

describe('UpdateFranchiseComponent', () => {
  let component: UpdateFranchiseComponent;
  let fixture: ComponentFixture<UpdateFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
