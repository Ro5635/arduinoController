import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightWidgetComponent } from './traffic-light-widget.component';

describe('TrafficLightWidgetComponent', () => {
  let component: TrafficLightWidgetComponent;
  let fixture: ComponentFixture<TrafficLightWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficLightWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
