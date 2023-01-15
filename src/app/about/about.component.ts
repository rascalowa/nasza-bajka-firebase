import { Component } from '@angular/core';
import { DBService } from '../service/db.service';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../app.component.css']
})
export class AboutComponent {
  mainPhoto: string;
  smallPhotoKaren: string;
  smallPhotoKlara: string;
  smallPhotoKinia: string;
  smallPhotoMarecki: string;

  constructor(
    private dbService: DBService,
    private readonly loaderService: LoaderService
    ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);
    let promiseMain = this.dbService.getLayoutPhoto('L-onas.jpg').then((url) => {
      this.mainPhoto = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmallKaren = this.dbService.getLayoutPhoto('S-onas-karen.jpg').then((url) => {
      this.smallPhotoKaren = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmallKlara = this.dbService.getLayoutPhoto('S-onas-klara.jpg').then((url) => {
      this.smallPhotoKlara = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmallKinia = this.dbService.getLayoutPhoto('S-onas-kinia.jpg').then((url) => {
      this.smallPhotoKinia = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmallMarecki = this.dbService.getLayoutPhoto('S-onas-marecki.jpg').then((url) => {
      this.smallPhotoMarecki = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    Promise.allSettled([promiseMain, promiseSmallKaren, promiseSmallKlara, promiseSmallKinia, promiseSmallMarecki])
    .then(() => this.loaderService.setLoading(false));
  }
}
