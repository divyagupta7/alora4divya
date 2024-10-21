import { TestBed } from '@angular/core/testing';

import { SweetsalertsServicesService } from './sweetsalerts-services.service';

describe('SweetsalertsServicesService', () => {
  let service: SweetsalertsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SweetsalertsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
