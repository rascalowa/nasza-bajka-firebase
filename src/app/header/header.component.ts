import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { Observable, takeUntil, Subject } from "rxjs";
import { LAYOUT_ENUM } from "../constans/layout.constans";
import { LayoutService } from "../service/layout.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoPath = './assets/Logo.png';
  logoTextPath = './assets/LogoText.png';
  screenSize$: Observable<LAYOUT_ENUM>;
  componentDestroyed$ = new Subject<void>();

  constructor(
    private layoutService: LayoutService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.screenSize$ = this.layoutService.size$.asObservable();
  }

  ngOnInit() {
    this.screenSize$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        () => this.cd.detectChanges()
      )
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }
}
