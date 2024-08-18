import { TestBed } from '@angular/core/testing';

import { TagAssetService } from './tag-asset.service';

describe('TagAssetService', () => {
  let service: TagAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
