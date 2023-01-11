import { Component, OnInit } from "@angular/core";
import { map } from "rxjs";
import { LayoutService } from "../service/layout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoPath = './assets/Logo.png';
  logoTextPath = './assets/LogoText.png';
  screenSize: string;

  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.size.subscribe(data => {
      this.screenSize = data
    })
  }
}
