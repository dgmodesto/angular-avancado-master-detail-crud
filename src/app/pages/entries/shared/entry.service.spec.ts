import { TestBed } from '@angular/core/testing';

import { EntrieService } from './entrie.service';

describe('EntrieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntrieService = TestBed.get(EntrieService);
    expect(service).toBeTruthy();
  });
});
