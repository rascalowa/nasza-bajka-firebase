import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, takeUntil, Subject, tap } from "rxjs";
import { LAYOUT_ENUM } from "../constans/layout.constans";
import { LayoutService } from "../service/layout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoPath = './assets/Logo.png';
  logoTextPath = './assets/LogoText.png';
  screenSize$: Observable<LAYOUT_ENUM>;
  componentDestroyed$ = new Subject<void>();
  isMobile: boolean;

  constructor(
    private layoutService: LayoutService
  ) {
    this.screenSize$ = this.layoutService.size$.asObservable();
  }

  ngOnInit() {
    this.screenSize$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(data => {
          this.isMobile = data === LAYOUT_ENUM.XSMALL || data === LAYOUT_ENUM.SMALL;
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }
}
