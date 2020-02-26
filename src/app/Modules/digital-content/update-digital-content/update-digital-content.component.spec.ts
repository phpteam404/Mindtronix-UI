import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDigitalContentComponent } from './update-digital-content.component';

describe('UpdateDigitalContentComponent', () => {
  let component: UpdateDigitalContentComponent;
  let fixture: ComponentFixture<UpdateDigitalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDigitalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDigitalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
