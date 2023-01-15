import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DBService } from '../service/db.service';
import { ContactService } from './contact.service';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css', '../app.component.css']
})
export class ContactComponent implements OnInit {
  mainPhoto: string;
  smallPhoto: string;
  messageSended = false;

  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    content: new FormControl('')
  });

  constructor(
    private contactService: ContactService,
    private dbService: DBService,
    private readonly loaderService: LoaderService
    ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);
    this.resetForm();
    this.dbService.getLayoutPhoto('L-kontakt.jpg').then((url) => {
      this.mainPhoto = url;
      this.loaderService.setLoading(false);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  onSubmit(form) {
    this.loaderService.setLoading(true);
    this.contactService.sendMessage(form)
      .subscribe(() => {
        this.messageSended = true;
        this.resetForm();
        this.loaderService.setLoading(false);
      }, error => {
        console.log({ error })
        this.loaderService.setLoading(false);
      })
  }

  onDestroy() {
    this.messageSended = false;
  }

  resetForm() {
    this.contactForm.reset();

    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key).setErrors(null) ;
    });
  }
}
