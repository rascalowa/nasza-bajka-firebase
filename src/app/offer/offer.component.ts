import { Component } from '@angular/core';
import { DBService } from '../service/db.service';
import { LoaderService } from '../service/loader.service';

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

  constructor(
    private dbService: DBService,
    private readonly loaderService: LoaderService
    ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);
    let promiseMain = this.dbService.getLayoutPhoto('L-oferta.jpg').then((url) => {
      this.mainPhoto = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall1 = this.dbService.getLayoutPhoto('S-oferta-pensjonat.jpg').then((url) => {
      this.smallPhotoPensjonat = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall2 = this.dbService.getLayoutPhoto('S-oferta-treningi.jpg').then((url) => {
      this.smallPhotoTreningi = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall3 = this.dbService.getLayoutPhoto('S-oferta-spacerki.jpg').then((url) => {
      this.smallPhotoSpacerki = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall4 = this.dbService.getLayoutPhoto('S-oferta-inne.jpg').then((url) => {
      this.smallPhotoInne = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    Promise.allSettled([promiseMain, promiseSmall1, promiseSmall2, promiseSmall3, promiseSmall4])
    .then(() => this.loaderService.setLoading(false));
  }
}
