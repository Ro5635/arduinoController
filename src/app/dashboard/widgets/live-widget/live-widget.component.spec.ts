import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveWidgetComponent } from './live-widget.component';

describe('LiveWidgetComponent', () => {
  let component: LiveWidgetComponent;
  let fixture: ComponentFixture<LiveWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
