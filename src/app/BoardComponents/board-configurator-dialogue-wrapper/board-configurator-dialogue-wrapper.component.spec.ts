import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardConfiguratorDialogueWrapperComponent } from './board-configurator-dialogue-wrapper.component';

describe('BoardConfiguratorDialogueWrapperComponent', () => {
  let component: BoardConfiguratorDialogueWrapperComponent;
  let fixture: ComponentFixture<BoardConfiguratorDialogueWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardConfiguratorDialogueWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardConfiguratorDialogueWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
