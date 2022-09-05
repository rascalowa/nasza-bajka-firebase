import { Component } from "@angular/core";
import { delay } from "rxjs/operators";
import { SCREEN_SIZE } from "../infrastructure/enum/screen-size.enum";
import { ResizeService } from "../resize.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logoWhitePath = './assets/logowhite-1662295044206.png';
  titleWhitePath = './assets/nb-logo-white.png';
  size: SCREEN_SIZE;

  constructor(private resizeSvc: ResizeService) {
    this.resizeSvc.onResize$
      .pipe(delay(0))
      .subscribe(x => {
        this.size = x;
      });
  }
}
