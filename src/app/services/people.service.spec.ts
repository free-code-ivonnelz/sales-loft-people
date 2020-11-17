import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PeopleService } from './people.service';

describe('PeopleService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeopleService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));

  it('should have add function', inject([PeopleService], (service: PeopleService) => {
    expect(service.getAllPeople).toBeTruthy();
  }));
});
