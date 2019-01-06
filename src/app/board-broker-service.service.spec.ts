import { TestBed } from '@angular/core/testing';

import { BoardBrokerServiceService } from './board-broker-service.service';

describe('BoardBrokerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoardBrokerServiceService = TestBed.get(BoardBrokerServiceService);
    expect(service).toBeTruthy();
  });
});
