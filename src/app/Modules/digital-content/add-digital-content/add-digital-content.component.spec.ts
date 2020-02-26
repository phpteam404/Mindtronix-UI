import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDigitalContentComponent } from './add-digital-content.component';

describe('AddDigitalContentComponent', () => {
  let component: AddDigitalContentComponent;
  let fixture: ComponentFixture<AddDigitalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDigitalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDigitalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
