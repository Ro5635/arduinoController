import { TestBed } from '@angular/core/testing';

import { LiveDashboardService } from './live-dashboard.service';

describe('LiveDashboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveDashboardService = TestBed.get(LiveDashboardService);
    expect(service).toBeTruthy();
  });
});
