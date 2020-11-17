import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PeopleService } from '../../../services/people.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people: any = [];
  notDataFound: any;
  frequencyCount: any = {};
  duplicatePeople: any = [];
  modalRef: BsModalRef;
  modalRef2: BsModalRef;

  constructor(public peopleService: PeopleService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.peopleService.getAllPeople().subscribe(response => {
      this.people = response;
    },
      error => {
        this.notDataFound = error;
      },
    );
  }

  openGetDuplicates(template: TemplateRef<any>): void {
    this.duplicatePeople = [];
    const thethis = this;
    this.people.map((item) => {
      // Match a string that starts with user email, similar to LIKE 'abc%'
      const pattern = new RegExp(item.email_address.split('@')[0]);
      const existItem = thethis.people.find(x => pattern.test(x.email_address) &&
      item.email_address.split('@')[1] === x.email_address.split('@')[1] && item.email_address !== x.email_address);
      if (existItem) {
        thethis.duplicatePeople.push({ email1: existItem.email_address, email2: item.email_address });
      }
    });
    this.modalRef2 = this.modalService.show(template);
  }

  openGetFrequency(template: TemplateRef<any>): void {
    const count = {};
    this.people.forEach((user) => {
      user['email_address'].split('').reduce((total, letter) => {
        total[letter] ? total[letter]++ : total[letter] = 1;
        count[letter] ? total[letter] + count[letter] : total[letter];
        return count;
      }, {});
    });
    this.frequencyCount = count;
    this.modalRef = this.modalService.show(template);
  }

}
