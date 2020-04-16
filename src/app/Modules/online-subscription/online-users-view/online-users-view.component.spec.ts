import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineUsersViewComponent } from './online-users-view.component';

describe('OnlineUsersViewComponent', () => {
  let component: OnlineUsersViewComponent;
  let fixture: ComponentFixture<OnlineUsersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineUsersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
