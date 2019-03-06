import { TestBed } from '@angular/core/testing';

import { HttpParamMapperServiceService } from './http-param-mapper-service.service';

describe('HttpParamMapperServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpParamMapperServiceService = TestBed.get(HttpParamMapperServiceService);
    expect(service).toBeTruthy();
  });
});
