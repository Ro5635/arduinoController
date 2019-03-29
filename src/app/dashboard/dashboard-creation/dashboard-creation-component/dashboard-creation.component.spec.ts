import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCreationComponent } from './dashboard-creation.component';

describe('DashboardCreationComponent', () => {
  let component: DashboardCreationComponent;
  let fixture: ComponentFixture<DashboardCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
