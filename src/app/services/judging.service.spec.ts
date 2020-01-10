import { TestBed } from '@angular/core/testing';

import { JudgingService } from './judging.service';

describe('JudgingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JudgingService = TestBed.get(JudgingService);
    expect(service).toBeTruthy();
  });
});
