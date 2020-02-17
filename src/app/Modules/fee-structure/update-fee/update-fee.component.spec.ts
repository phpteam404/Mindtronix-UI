import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFeeComponent } from './update-fee.component';

describe('UpdateFeeComponent', () => {
  let component: UpdateFeeComponent;
  let fixture: ComponentFixture<UpdateFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
