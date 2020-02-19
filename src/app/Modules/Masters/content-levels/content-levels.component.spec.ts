import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLevelsComponent } from './content-levels.component';

describe('ContentLevelsComponent', () => {
  let component: ContentLevelsComponent;
  let fixture: ComponentFixture<ContentLevelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentLevelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentLevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
