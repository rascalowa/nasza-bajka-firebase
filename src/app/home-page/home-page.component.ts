import { ChangeDetectorRef, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { DBService } from '../service/db.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  mainPhoto: string;
  smallPhoto: string;
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

    this.dbService.getLayoutPhoto('S-stajnia.jpg').then((url) => {
      this.smallPhoto = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}
