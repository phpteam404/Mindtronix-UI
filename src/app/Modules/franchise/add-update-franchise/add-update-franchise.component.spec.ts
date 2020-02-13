import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateFranchiseComponent } from './add-update-franchise.component';

describe('AddUpdateFranchiseComponent', () => {
  let component: AddUpdateFranchiseComponent;
  let fixture: ComponentFixture<AddUpdateFranchiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateFranchiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateFranchiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
