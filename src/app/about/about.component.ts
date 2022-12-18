import { Component } from '@angular/core';
import { DBService } from '../service/db.service';

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
  isLoading = true;

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.dbService.getLayoutPhoto('L-onas.jpg').then((url) => {
      this.mainPhoto = url;
      this.isLoading = false;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-onas-karen.jpg').then((url) => {
      this.smallPhotoKaren = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-onas-klara.jpg').then((url) => {
      this.smallPhotoKlara = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-onas-kinia.jpg').then((url) => {
      this.smallPhotoKinia = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-onas-marecki.jpg').then((url) => {
      this.smallPhotoMarecki = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}
