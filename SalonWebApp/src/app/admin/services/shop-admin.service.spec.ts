import { TestBed } from '@angular/core/testing';

import { ShopAdminService } from './shop-admin.service';

describe('ShopAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopAdminService = TestBed.get(ShopAdminService);
    expect(service).toBeTruthy();
  });
});
