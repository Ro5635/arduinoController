import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlComponentComponent } from './control-component.component';

describe('ControlComponentComponent', () => {
  let component: ControlComponentComponent;
  let fixture: ComponentFixture<ControlComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
