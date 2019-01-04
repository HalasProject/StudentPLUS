import { TestBed } from '@angular/core/testing';

import { CanAuthService } from './can-auth.service';

describe('CanAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanAuthService = TestBed.get(CanAuthService);
    expect(service).toBeTruthy();
  });
});
