import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphWidgetSettingsComponent } from './graph-widget-settings.component';

describe('GraphWidgetSettingsComponent', () => {
  let component: GraphWidgetSettingsComponent;
  let fixture: ComponentFixture<GraphWidgetSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphWidgetSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphWidgetSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
