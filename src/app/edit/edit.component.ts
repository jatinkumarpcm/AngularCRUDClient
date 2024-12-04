import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, model } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserContact } from '../model/contact/contact.model';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})

export class EditComponent implements OnInit {


  constructor(private formbuilder: FormBuilder, private _contactService: ContactService) { }

  public EditContactForm: FormGroup;
  public submitted: Boolean = false;
  msg: string;

  @Input() item: UserContact;
  @Output()  ItemEvent = new EventEmitter<string>();
  ngOnInit() {

    this.EditContactForm = this.formbuilder.group({
      firstname: [this.item.firstname, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: [this.item.lastname, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: [this.item.email, [Validators.required, Validators.email]],
    });
  }



  onSubmit() {
    this.submitted = true;
    if (this.EditContactForm.invalid) {
      return;
    }

    

    this._contactService.UpdateContact(this.item.id, {
      id: this.item.id,
      firstname: this.EditContactForm.controls["firstname"].value,
      lastname: this.EditContactForm.controls["lastname"].value,
      email: this.EditContactForm.controls["email"].value
    }).subscribe((res: any) => {

      if (res && res.statusCode == 200) {
        this.msg = res.message;
        setTimeout(() => {
          this.ItemEvent.emit('close modal popup');
        }, 1000);
         }
    }, (error: any) => {
      console.log(error);
      this.msg = error.error.title;
    })
  }


  get f() {
    return this.EditContactForm.controls;
  }
}
