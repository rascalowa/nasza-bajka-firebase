import { Component } from '@angular/core';
import { DBService } from '../service/db.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['../app.component.css']
})
export class OfferComponent {
  mainPhoto: string;
  smallPhotoPensjonat: string;
  smallPhotoTreningi: string;
  smallPhotoSpacerki: string;
  smallPhotoInne: string;
  isLoading = true;

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.dbService.getLayoutPhoto('L-oferta.jpg').then((url) => {
      this.mainPhoto = url;
      this.isLoading = false;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-oferta-pensjonat.jpg').then((url) => {
      this.smallPhotoPensjonat = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-oferta-treningi.jpg').then((url) => {
      this.smallPhotoTreningi = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-oferta-spacerki.jpg').then((url) => {
      this.smallPhotoSpacerki = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-oferta-inne.jpg').then((url) => {
      this.smallPhotoInne = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}
