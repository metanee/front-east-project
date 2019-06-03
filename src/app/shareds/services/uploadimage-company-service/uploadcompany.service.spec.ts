import { TestBed, inject } from '@angular/core/testing';

import { UploadcompanyService } from './uploadcompany.service';

describe('UploadcompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadcompanyService]
    });
  });

  it('should be created', inject([UploadcompanyService], (service: UploadcompanyService) => {
    expect(service).toBeTruthy();
  }));
});
