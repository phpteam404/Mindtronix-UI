import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineSubscriptionComponent } from './online-subscription.component';

describe('OnlineSubscriptionComponent', () => {
  let component: OnlineSubscriptionComponent;
  let fixture: ComponentFixture<OnlineSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
