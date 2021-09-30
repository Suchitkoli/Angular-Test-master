import { TestBed } from '@angular/core/testing';

import { AlertAreaService } from './alert-area.service';

describe('AlertAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertAreaService = TestBed.get(AlertAreaService);
    expect(service).toBeTruthy();
  });
});
