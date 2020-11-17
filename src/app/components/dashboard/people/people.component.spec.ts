import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { PeopleComponent } from './people.component';
import { PeopleService } from '../../../services/people.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { throwError, of } from 'rxjs';
import { TemplateRef } from '@angular/core';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleComponent ],
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

  describe('Get people', () => {

    it('should return an error',  () => {
      spyOn(component.peopleService, 'getAllPeople').and.returnValue(throwError('Something bad happened; please try again later.'));
      component.ngOnInit();
      expect(component.notDataFound).toEqual('Something bad happened; please try again later.');
    });

    it('should be fine',  () => {
      const people = [1,2,3];
      spyOn(component.peopleService,'getAllPeople').and.returnValue(of(people));
      component.ngOnInit();
      expect(component.people).toEqual(people);
    });
  });
});
