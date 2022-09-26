import { TestBed } from '@angular/core/testing';

import { TutoringRequestsService } from './tutoring-requests.service';

describe('TutoringRequestsService', () => {
  let service: TutoringRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoringRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
