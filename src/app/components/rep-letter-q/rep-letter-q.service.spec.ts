import { TestBed } from '@angular/core/testing';

import { RepLetterQService } from './rep-letter-q.service';

describe('RepLetterQService', () => {
  let service: RepLetterQService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepLetterQService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
