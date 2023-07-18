import { Component, OnInit } from '@angular/core';
import { Icontact } from 'src/app/models/Icontact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-mgr',
  templateUrl: './contact-mgr.component.html',
  styleUrls: ['./contact-mgr.component.css']
})
export class ContactMgrComponent implements OnInit{

  public loading: boolean = false;
  public contacts : Icontact[] = [];
  public errorMessage : string | null = null;
  public user: string = '';
  contactsDuplicate : Icontact[] = [];

  constructor(private contactService: ContactService) {

  }

  ngOnInit(): void {
      this.getAllContacts();
  }

  getAllContacts() {
    this.loading = true;
    this.contactService.getAllContacts().subscribe((contacts: Icontact[])=> {
      this.contacts = contacts;
      this.contactsDuplicate = contacts;
      this.loading = false;
    },
    error=> {
      this.errorMessage = error;
      this.loading = false;
    });
  }

  deleteContact(contactId: string | undefined) {
    if (contactId) {
      this.contactService.deleteContact(contactId).subscribe((contact: {}) => {
        this.getAllContacts();
      },
      error=> {
        this.errorMessage = error;
        this.loading = false;
      })
    }
  }


  searchUser() {
    if (this.user) {
      this.contacts = this.contactsDuplicate.filter(el => el.name.includes(this.user))
    } else {
      this.contacts = this.contactsDuplicate;
    }
  }

  reset() {
    this.user = '';
    this.contacts = this.contactsDuplicate;
  }

}
