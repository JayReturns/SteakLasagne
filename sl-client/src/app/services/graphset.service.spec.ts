import { TestBed } from '@angular/core/testing';

import { GraphsetService } from './graphset.service';

describe('GraphsetService', () => {
  let service: GraphsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
