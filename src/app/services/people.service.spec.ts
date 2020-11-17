import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { PeopleService } from './people.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PeopleService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService, HttpClient, HttpHandler],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));

  it('should have add function', inject([PeopleService], (service: PeopleService) => {
    expect(service.getAllPeople).toBeTruthy();
  }));

  it('should return an Observable<User[]>', inject([PeopleService], (service: PeopleService) => {
    const dummyUsers = [{ name: 'John' }, { name: 'Doe' }];
    service.getAllPeople().subscribe(users => {
      expect(users).toEqual(dummyUsers);
    });
  }));

  it('should return an Error',  inject([PeopleService], (service: PeopleService) => {
    const dummyError: any = HttpErrorResponse;
    service.handleError(dummyError).subscribe(users => {
      expect(users).toEqual({ error: 'Something bad happened; please try again later.' });
    });
  }));

});
