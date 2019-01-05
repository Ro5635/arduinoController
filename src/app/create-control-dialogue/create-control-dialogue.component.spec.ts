import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateControlDialogueComponent } from './create-control-dialogue.component';

describe('CreateControlDialogueComponent', () => {
  let component: CreateControlDialogueComponent;
  let fixture: ComponentFixture<CreateControlDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateControlDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateControlDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
