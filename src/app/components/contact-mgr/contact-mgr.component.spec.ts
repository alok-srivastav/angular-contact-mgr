import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMgrComponent } from './contact-mgr.component';

describe('ContactMgrComponent', () => {
  let component: ContactMgrComponent;
  let fixture: ComponentFixture<ContactMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactMgrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
