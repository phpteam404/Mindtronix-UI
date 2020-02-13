import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalManagementComponent } from './portal-management.component';

describe('PortalManagementComponent', () => {
  let component: PortalManagementComponent;
  let fixture: ComponentFixture<PortalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
