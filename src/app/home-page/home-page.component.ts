import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { DBService } from '../service/db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../app.component.css']
})
export class HomePageComponent implements OnInit {
  mainPhoto: string;
  smallPhoto1: string;
  smallPhoto2: string;
  smallPhoto3: string;
  isLoading = true;

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.dbService.getLayoutPhoto('L-stajnia.jpg').then((url) => {
      this.mainPhoto = url;
      this.isLoading = false;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-stajnia-1.jpg').then((url) => {
      this.smallPhoto1 = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-stajnia-2.jpg').then((url) => {
      this.smallPhoto2 = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    this.dbService.getLayoutPhoto('S-stajnia-3.jpg').then((url) => {
      this.smallPhoto3 = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}
