import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContact } from '../model/contact/contact.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }


  myBehaviorSubject = new BehaviorSubject<boolean>(false);
  BehaviorSubject$ = this.myBehaviorSubject.asObservable()

   baseUrl = 'https://localhost:7000/api/contact/';

  public addContact(model: UserContact)
  {
    const headers = { 'content-type': 'application/json' }

    return this.httpClient.post(this.baseUrl + 'AddContact', {
      id: model.id = 0,  // we are handling autoincrement at server-side
      firstname: model.firstname,
      lastname: model.lastname,
      email: model.email,
    });
  }

  public getContactlist()  {
    return this.httpClient.get(this.baseUrl + 'getContactlist');
  }

  public deleteContact(id: number)
  {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.delete(this.baseUrl + id, httpOptions);
  }


  public UpdateContact(id: number, model: UserContact) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.put(this.baseUrl + id,
      {
          id: model.id,
          firstname: model.firstname,
          lastname: model.lastname,
          email: model.email,
      }, httpOptions);
  }


  PageEvent(data: boolean) {
    this.myBehaviorSubject.next(data);
  }

}
