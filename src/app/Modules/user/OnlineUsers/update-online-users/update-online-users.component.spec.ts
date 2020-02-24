import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOnlineUsersComponent } from './update-online-users.component';

describe('UpdateOnlineUsersComponent', () => {
  let component: UpdateOnlineUsersComponent;
  let fixture: ComponentFixture<UpdateOnlineUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateOnlineUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOnlineUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
