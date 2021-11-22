import { TestBed } from '@angular/core/testing';

import { APIAlumnosService } from './apialumnos.service';

describe('APIAlumnosService', () => {
  let service: APIAlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIAlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
