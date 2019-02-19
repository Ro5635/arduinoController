import { TestBed } from '@angular/core/testing';

import { ElectronControlService } from './electron-control.service';

describe('ElectronControlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectronControlService = TestBed.get(ElectronControlService);
    expect(service).toBeTruthy();
  });
});
