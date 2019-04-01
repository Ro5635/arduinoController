import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphWidgetWizardComponent } from './graph-widget-wizard.component';

describe('GraphWidgetWizardComponent', () => {
  let component: GraphWidgetWizardComponent;
  let fixture: ComponentFixture<GraphWidgetWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphWidgetWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphWidgetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
