import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ContactDetails } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  sendMessage(input: ContactDetails) {
    return this.http.post('https://formspree.io/f/mrgdeeqw',
      input,
      { responseType: 'text'})
    .pipe(
      map(
        (response) => {
          if (response) {
          return response;
          }
        },
        (error: any) => {
          return error;
        }
      )
    )
  }
}
