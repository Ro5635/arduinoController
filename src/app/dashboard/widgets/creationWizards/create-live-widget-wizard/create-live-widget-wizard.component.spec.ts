import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLiveWidgetWizardComponent } from './create-live-widget-wizard.component';

describe('CreateLiveWidgetWizardComponent', () => {
  let component: CreateLiveWidgetWizardComponent;
  let fixture: ComponentFixture<CreateLiveWidgetWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLiveWidgetWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLiveWidgetWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
