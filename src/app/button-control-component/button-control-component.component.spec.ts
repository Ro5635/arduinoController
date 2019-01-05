import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonControlComponentComponent } from './button-control-component.component';

describe('ButtonControlComponentComponent', () => {
  let component: ButtonControlComponentComponent;
  let fixture: ComponentFixture<ButtonControlComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonControlComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonControlComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
