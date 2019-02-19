import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardProgrammerComponent } from './board-programmer.component';

describe('BoardProgrammerComponent', () => {
  let component: BoardProgrammerComponent;
  let fixture: ComponentFixture<BoardProgrammerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardProgrammerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardProgrammerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
