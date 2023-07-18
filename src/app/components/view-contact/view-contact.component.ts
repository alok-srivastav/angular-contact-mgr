import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Icontact } from 'src/app/models/Icontact';
import { Igroup } from 'src/app/models/Igroup';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit{
  public contactId: string | null = null;
  public contact: Icontact = {} as Icontact;
  public loading: boolean = false;
  public errorMessage: string | null = null;
  public group: Igroup = {} as Igroup;
  
  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
    ) {

  }

  ngOnInit(): void {
      this.activatedRoute.paramMap.subscribe(params=> {
        this.contactId = params.get('contactId');
        this.getContactById(params.get('contactId'));
      });
  }

  getContactById(contactId: any) {
    this.loading = true;
    this.contactService.getContactById(contactId).subscribe((contact: Icontact) => {
      this.contact = contact;
      this.contactService.getGroupById(contact).subscribe((group: Igroup) => {
        this.group = group;
        this.loading = false;
      },
      error=> {
        // this.loading = false;
      });
    },
    error=> {
      this.loading = false;
    });
  }

}
