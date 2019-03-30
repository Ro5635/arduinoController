import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderWidgetWizardComponent } from './slider-widget-wizard.component';

describe('SliderWidgetWizardComponent', () => {
  let component: SliderWidgetWizardComponent;
  let fixture: ComponentFixture<SliderWidgetWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderWidgetWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderWidgetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
