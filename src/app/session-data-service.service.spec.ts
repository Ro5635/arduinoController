import { TestBed } from '@angular/core/testing';

import { SessionDataServiceService } from './session-data-service.service';

describe('SessionDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionDataServiceService = TestBed.get(SessionDataServiceService);
    expect(service).toBeTruthy();
  });
});
