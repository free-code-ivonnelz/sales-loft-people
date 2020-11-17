import { Component, OnInit, TemplateRef } from '@angular/core';
import { PeopleService } from '../../../services/people.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people:any = [];
  frequencyCount: any = {};
  modalRef: BsModalRef;
  

  constructor(private peopleService: PeopleService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.peopleService.getAllPeople().subscribe(data => {
      this.people = data;
      console.log('data', data);
    })
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    let count = {};
    this.people.forEach(function(user) {
      user['email'].split('').reduce((total, letter) => {
        total[letter] ? total[letter]++ : total[letter] = 1;
        count[letter] ? total[letter] + count[letter] : total[letter];
        return count;
      }, {});
   });
   this.frequencyCount = count;
}

}
