import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { UserContact } from '../model/contact/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private router: Router, private contactService: ContactService) {

  }
  contactlist: any = [];
  isOpenModalClicked: boolean = false;
  contactDetails: UserContact;
  msg: string; 

  ngOnInit() {
    this.getContactlist();
    this.contactService.BehaviorSubject$.subscribe((res: any) => {
      if (res) {
        this.getContactlist();
      }
    });
  }

  getContactlist() {

    this.contactService.getContactlist().subscribe((res: any) => {
      if (res.result != null && res.statusCode == 200) {
        this.contactlist = res.result;
        console.log(this.contactlist);
        this.msg = "";
      }
    }, (error: any) => {
      console.log(error);
    });
  }


  onedit(contact: UserContact) {
    this.contactDetails = contact;
    this.OpenModal();

  }

  ondelete(userContact: UserContact) {
    this.contactService.deleteContact(userContact.id).subscribe((res: any) => {
      if (res.result && res.statusCode == 200) {
        console.log(res);
        this.msg = res.message;
        this.contactService.PageEvent(true);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  AddContactEvent() {
    this.router.navigate(['/add']);
  }




  OpenModal() {
    this.isOpenModalClicked = true;
  }

  closeModal(e?: any) {
    console.log(e);
    this.isOpenModalClicked = false;

    if (e != null) {
      this.getContactlist();
    }
  }




}
