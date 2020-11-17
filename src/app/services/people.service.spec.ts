import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { PeopleService } from './people.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('PeopleService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService, HttpClient, HttpHandler],
      imports: [HttpClientTestingModule]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));

  it('should have add function', inject([PeopleService], (service: PeopleService) => {
    expect(service.getAllPeople).toBeTruthy();
  }));

  it('should return an Observable<User[]>', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    const dummyUsers = [{ name: 'John' }, { name: 'Doe' }];
    
    service.getAllPeople().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });
  });

  it('should return an Error', () => {
    const service: PeopleService = TestBed.get(PeopleService);
    const dummyError: any = HttpErrorResponse;

    service.handleError(dummyError).subscribe(users => {
      expect(users).toEqual({error:'Something bad happened; please try again later.'});
    });
  });
});
