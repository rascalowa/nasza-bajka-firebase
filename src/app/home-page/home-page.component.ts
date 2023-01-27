import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { LAYOUT_ENUM } from '../constans/layout.constans';
import { DBService } from '../service/db.service';
import { LayoutService } from '../service/layout.service';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['../app.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  mainPhoto: string;
  smallPhoto1: string;
  smallPhoto2: string;
  smallPhoto3: string;

  screenSize$: Observable<LAYOUT_ENUM>;
  componentDestroyed$ = new Subject<void>();
  screen = LAYOUT_ENUM.MEDIUM;

  constructor(
    private dbService: DBService,
    private readonly loaderService: LoaderService,
    private layoutService: LayoutService
  ) {
    this.screenSize$ = this.layoutService.size$.asObservable();
  }

  ngOnInit() {
    this.loaderService.setLoading(true);
    let promiseMain = this.dbService.getLayoutPhoto('L-stajnia.jpg').then((url) => {
      this.mainPhoto = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmall1 = this.dbService.getLayoutPhoto('S-stajnia-1.jpg').then((url) => {
      this.smallPhoto1 = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmall2 = this.dbService.getLayoutPhoto('S-stajnia-2.jpg').then((url) => {
      this.smallPhoto2 = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmall3 = this.dbService.getLayoutPhoto('S-stajnia-3.jpg').then((url) => {
      this.smallPhoto3 = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    Promise.allSettled([promiseMain, promiseSmall1, promiseSmall2, promiseSmall3])
        .then(() => this.loaderService.setLoading(false));

    this.screenSize$
      .pipe(
        takeUntil(this.componentDestroyed$),
        tap(data => {
          this.screen = data;
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
  }
}
