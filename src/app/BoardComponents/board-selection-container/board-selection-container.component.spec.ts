import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSelectionContainerComponent } from './board-selection-container.component';

describe('BoardSelectionContainerComponent', () => {
  let component: BoardSelectionContainerComponent;
  let fixture: ComponentFixture<BoardSelectionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSelectionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSelectionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
