import { Component } from '@angular/core';
import { DBService } from '../service/db.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent {
  mainPhoto: string;
  isLoading: false;

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.dbService.getLayoutPhoto('L-oferta.jpg').then((url) => {
      this.mainPhoto = url;
      this.isLoading = false;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}
