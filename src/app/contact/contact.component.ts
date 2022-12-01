import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ContactDetails } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  messageSended = false;
  isLoading = false;
  showConfirmationDialog = false;

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl('')
  });

  constructor( private contactService: ContactService ) {}

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form) {
    this.isLoading = true;
    this.contactService.sendMessage(form)
      .subscribe(() => {
        this.messageSended = true;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        console.log({ error })
      })
  }

  onCloseDialog() {
    this.showConfirmationDialog = false;
  }

  onDestroy() {
    this.messageSended = false;
  }

  resetForm() {
    this.contactForm.reset();
    this.isLoading = false;
  }
}
