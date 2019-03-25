import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSettingsCoreComponent } from './dashboard-settings-core.component';

describe('DashboardSettingsCoreComponent', () => {
  let component: DashboardSettingsCoreComponent;
  let fixture: ComponentFixture<DashboardSettingsCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSettingsCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSettingsCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
