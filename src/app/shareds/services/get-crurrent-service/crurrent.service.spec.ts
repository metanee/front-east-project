import { TestBed, inject } from '@angular/core/testing';

import { CrurrentService } from './crurrent.service';

describe('CrurrentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrurrentService]
    });
  });

  it('should be created', inject([CrurrentService], (service: CrurrentService) => {
    expect(service).toBeTruthy();
  }));
});
