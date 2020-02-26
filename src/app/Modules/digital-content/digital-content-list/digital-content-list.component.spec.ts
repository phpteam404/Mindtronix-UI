import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalContentListComponent } from './digital-content-list.component';

describe('DigitalContentListComponent', () => {
  let component: DigitalContentListComponent;
  let fixture: ComponentFixture<DigitalContentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalContentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalContentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
