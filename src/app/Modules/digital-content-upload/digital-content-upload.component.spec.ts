import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalContentUploadComponent } from './digital-content-upload.component';

describe('DigitalContentUploadComponent', () => {
  let component: DigitalContentUploadComponent;
  let fixture: ComponentFixture<DigitalContentUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalContentUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalContentUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
