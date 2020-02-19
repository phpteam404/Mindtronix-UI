import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FranchiseInvoiceComponent } from './franchise-invoice.component';


describe('FranchiseListComponent', () => {
  let component: FranchiseInvoiceComponent;
  let fixture: ComponentFixture<FranchiseInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FranchiseInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FranchiseInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
