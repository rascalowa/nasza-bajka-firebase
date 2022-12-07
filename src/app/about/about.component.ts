import { Component } from '@angular/core';
import { DBService } from '../service/db.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  mainPhoto: string;
  smallPhoto: string;
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

    this.dbService.getLayoutPhoto('S-onas.jpg').then((url) => {
      this.smallPhoto = url;
    })
    .catch((error) => {
      console.log(error.message);
    });
  }
}
