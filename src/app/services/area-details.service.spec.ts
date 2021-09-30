import { TestBed } from '@angular/core/testing';

import { AreaDetailsService } from './area-details.service';

describe('AreaDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AreaDetailsService = TestBed.get(AreaDetailsService);
    expect(service).toBeTruthy();
  });
});
