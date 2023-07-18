import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Icontact } from '../models/Icontact';
import { Igroup } from '../models/Igroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private serverUrl : string = `http://localhost:9000`; //json server url

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllContacts(): Observable<Icontact[]> {
    const url = `${this.serverUrl}/contacts`;
    return this.httpClient.get<Icontact[]>(url).pipe(catchError(this.handleError));
  }

  getContactById(contactId: string): Observable<Icontact> {
    const url = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.get<Icontact>(url).pipe(catchError(this.handleError));
  }

  createContact(contact: Icontact): Observable<Icontact> {
    const url = `${this.serverUrl}/contacts`;
    return this.httpClient.post<Icontact>(url, contact).pipe(catchError(this.handleError));
  }

  updateContact(contact: Icontact, contactId: string): Observable<Icontact> {
    const url = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.put<Icontact>(url, contact).pipe(catchError(this.handleError));
  }

  deleteContact(contactId: string): Observable<{}> {
    const url = `${this.serverUrl}/contacts/${contactId}`;
    return this.httpClient.delete<{}>(url).pipe(catchError(this.handleError));
  }

  getAllGroups(): Observable<Igroup[]> {
    const url = `${this.serverUrl}/groups`;
    return this.httpClient.get<Igroup[]>(url).pipe(catchError(this.handleError));
  }

  getGroupById(contact: Icontact): Observable<Igroup> {
    const url = `${this.serverUrl}/groups/${contact.groupId}`;
    return this.httpClient.get<Igroup>(url).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if(error instanceof ErrorEvent) {
      // client error
      errorMessage = `Error : ${error['error']['message']}`;
    } else {
      // server error
      errorMessage = `Status : ${error['status']} \n Message: ${error['message']}`;
    }
    return throwError(errorMessage);
  }
}
