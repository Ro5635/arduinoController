import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateButtonWidgetWizardComponent } from './create-button-widget-wizard.component';

describe('CreateButtonWidgetWizardComponent', () => {
  let component: CreateButtonWidgetWizardComponent;
  let fixture: ComponentFixture<CreateButtonWidgetWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateButtonWidgetWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateButtonWidgetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
