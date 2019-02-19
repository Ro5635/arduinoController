import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardConfiguratorComponent } from './board-configurator.component';

describe('BoardConfiguratorComponent', () => {
  let component: BoardConfiguratorComponent;
  let fixture: ComponentFixture<BoardConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
