import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficLightWidgetWizardComponent } from './traffic-light-widget-wizard.component';

describe('TrafficLightWidgetWizardComponent', () => {
  let component: TrafficLightWidgetWizardComponent;
  let fixture: ComponentFixture<TrafficLightWidgetWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficLightWidgetWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightWidgetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
