import { TestBed } from '@angular/core/testing';

import { BaseResourceService } from './base-resource.service';

describe('BaseResourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseResourceService = TestBed.get(BaseResourceService);
    expect(service).toBeTruthy();
  });
});
