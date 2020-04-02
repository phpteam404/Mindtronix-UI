import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInvoiceComponent } from './school-invoice.component';

describe('SchoolInvoiceComponent', () => {
  let component: SchoolInvoiceComponent;
  let fixture: ComponentFixture<SchoolInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
