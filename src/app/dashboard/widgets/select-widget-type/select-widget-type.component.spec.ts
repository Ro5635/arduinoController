import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectWidgetTypeComponent } from './select-widget-type.component';

describe('SelectWidgetTypeComponent', () => {
  let component: SelectWidgetTypeComponent;
  let fixture: ComponentFixture<SelectWidgetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectWidgetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectWidgetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
