import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DBService } from '../service/db.service';
import { ContactDetails } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css']
})
export class ContactComponent implements OnInit {
  mainPhoto: string;
  smallPhoto: string;
  messageSended = false;
  isLoading = false;
  showConfirmationDialog = false;

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl('')
  });

  constructor( private contactService: ContactService, private dbService: DBService) {}

  ngOnInit() {
    this.resetForm();
    this.dbService.getLayoutPhoto('L-kontakt.jpg').then((url) => {
      this.mainPhoto = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
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
