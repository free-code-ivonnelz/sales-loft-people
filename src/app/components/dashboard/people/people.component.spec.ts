import { ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PeopleComponent } from './people.component';
import { PeopleService } from '../../../services/people.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { throwError, of } from 'rxjs';
import { TemplateRef, ElementRef } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent],
      providers: [PeopleService, HttpClient, HttpHandler],
      imports: [
        ModalModule.forRoot()
      ],

    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get All People', () => {

    it('should return an error', () => {
      spyOn(component.peopleService, 'getAllPeople').and.returnValue(throwError('Something bad happened; please try again later.'));
      component.ngOnInit();
      expect(component.notDataFound).toEqual('Something bad happened; please try again later.');
    });

    it('should return people data', () => {
      const people = [1, 2, 3];
      spyOn(component.peopleService, 'getAllPeople').and.returnValue(of(people));
      component.ngOnInit();
      expect(component.people).toEqual(people);
    });

  });

  describe('get Frequency count', () => {

    it('should open a modal', fakeAsync(() => {
      const frequencyCount = {};
      spyOn(component, 'openGetFrequency').and.callThrough();
      component.openGetFrequency();
      expect(component.frequencyCount).toEqual(frequencyCount);
    }));

  });

  describe('get Duplicates', () => {

    it('should open a modal', fakeAsync(() => {
      const duplicatePeople = [];
      spyOn(component, 'openGetDuplicates').and.callThrough();
      component.openGetDuplicates();
      expect(component.duplicatePeople).toEqual(duplicatePeople);
    }));

  });

});
