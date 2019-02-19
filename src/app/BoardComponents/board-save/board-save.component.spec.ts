import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardSaveComponent } from './board-save.component';

describe('BoardSaveComponent', () => {
  let component: BoardSaveComponent;
  let fixture: ComponentFixture<BoardSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
