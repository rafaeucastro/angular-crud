import { FormUtilsService } from './form-utils.service';
import { TestBed } from '@angular/core/testing';

describe('FormUtilsService', () => {
  let service: FormUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
