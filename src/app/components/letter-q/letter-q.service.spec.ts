import { TestBed } from '@angular/core/testing';

import { LetterQService } from './letter-q.service';

describe('LetterQService', () => {
  let service: LetterQService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterQService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
