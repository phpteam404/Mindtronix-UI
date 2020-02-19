import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OnlineUsersInvoiceComponent } from './online-users-invoice.component';


describe('OnlineUsersListComponent', () => {
  let component: OnlineUsersInvoiceComponent;
  let fixture: ComponentFixture<OnlineUsersInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineUsersInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineUsersInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
