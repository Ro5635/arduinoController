import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBoardForLoadDialogueComponent } from './confirm-board-for-load-dialogue.component';

describe('ConfirmBoardForLoadDialogueComponent', () => {
  let component: ConfirmBoardForLoadDialogueComponent;
  let fixture: ComponentFixture<ConfirmBoardForLoadDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmBoardForLoadDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBoardForLoadDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
