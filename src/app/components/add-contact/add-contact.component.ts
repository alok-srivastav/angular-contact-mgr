import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icontact } from 'src/app/models/Icontact';
import { Igroup } from 'src/app/models/Igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public contact: Icontact = {} as Icontact;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public groups: Igroup[] = [];

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups() {
    this.loading = true;
    this.contactService.getAllGroups().subscribe((groups: Igroup[]) => {
       this.groups = groups;
       this.loading = false;
    },
    error=> {
      this.loading = false;
    });
  }

  createContact() {
    this.loading = true;
    this.contactService.createContact(this.contact).subscribe((contact: Icontact) => {
      this.loading = false;
      this.router.navigate(['/']);
    },
    error=> {
      this.loading = false;
      this.errorMessage = error;
    });
  }

}
