import { Component, OnInit } from '@angular/core';
import { DBService } from '../service/db.service';
import { LoaderService } from '../service/loader.service';

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

  constructor(
    private dbService: DBService,
    private readonly loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loaderService.setLoading(true);
    let promiseMain = this.dbService.getLayoutPhoto('L-stajnia.jpg').then((url) => {
      this.mainPhoto = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall1 = this.dbService.getLayoutPhoto('S-stajnia-1.jpg').then((url) => {
      this.smallPhoto1 = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall2 = this.dbService.getLayoutPhoto('S-stajnia-2.jpg').then((url) => {
      this.smallPhoto2 = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    let promiseSmall3 = this.dbService.getLayoutPhoto('S-stajnia-3.jpg').then((url) => {
      this.smallPhoto3 = url;
    })
    .catch((error) => {
      console.log(error.message);
    });

    Promise.allSettled([promiseMain, promiseSmall1, promiseSmall2, promiseSmall3])
        .then(() => this.loaderService.setLoading(false));
  }
}
