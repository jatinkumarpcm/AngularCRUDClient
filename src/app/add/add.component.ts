import { HttpClient } from '@angular/common/http';
import { Component, model } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { UserContact } from '../model/contact/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  public AddContactForm: FormGroup;
  public submitted: Boolean = false;
  constructor(private formbuilder: FormBuilder, private userContact: ContactService, private router: Router) { }

  msg: string

  ngOnInit() {

    this.AddContactForm = this.formbuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }


  onSubmit() {

    this.submitted = true;

    if (this.AddContactForm.invalid) {
      this.msg = "Please Enter Valid Details";
      return;
    }

    this.userContact.addContact({
      id: 0,              // contact id handled at server side
      firstname: this.AddContactForm.controls["firstname"].value,
      lastname: this.AddContactForm.controls["lastname"].value,
      email: this.AddContactForm.controls["email"].value
    }).subscribe((res: any) => {
      if (res && res.statusCode == 200) {
        this.msg = res.message;
        // this.AddContactForm.reset();
        setTimeout(() => {
          this.router.navigate(['/contact'])
        }, 1000);

      }
    }, (error :any) => {
      console.log(error);
      this.msg = error.error.title;
    })

  }
  get f() {
    return this.AddContactForm.controls;
  }

  BacktoContactPage() {
    this.router.navigate(['/contact'])
  }
}
