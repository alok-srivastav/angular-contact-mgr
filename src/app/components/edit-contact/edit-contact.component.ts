import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Icontact } from 'src/app/models/Icontact';
import { Igroup } from 'src/app/models/Igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css'],
})
export class EditContactComponent implements OnInit {
  public contactId: string | null = null;
  public contact: Icontact = {} as Icontact;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public group: Igroup = {} as Igroup;
  public groups: Igroup[] = [];

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllGroups();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contactId = params.get('contactId');
      this.getContactById(params.get('contactId'));
    });
  }

  getAllGroups() {
    this.loading = true;
    this.contactService.getAllGroups().subscribe(
      (groups: Igroup[]) => {
        this.groups = groups;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getContactById(contactId: any) {
    this.loading = true;
    this.contactService.getContactById(contactId).subscribe(
      (contact: Icontact) => {
        this.contact = contact;
        this.contactService.getGroupById(contact).subscribe(
          (group: Igroup) => {
            this.group = group;
            this.loading = false;
          },
          (error) => {
            // this.loading = false;
          }
        );
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  updateContact() {
    if (this.contactId) {
      this.loading = true;
      this.contactService.updateContact(this.contact, this.contactId).subscribe(
        (contact: Icontact) => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error;
        }
      );
    }
  }
}
