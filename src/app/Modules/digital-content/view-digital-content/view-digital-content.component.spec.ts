import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDigitalContentComponent } from './view-digital-content.component';

describe('ViewDigitalContentComponent', () => {
  let component: ViewDigitalContentComponent;
  let fixture: ComponentFixture<ViewDigitalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDigitalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDigitalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
