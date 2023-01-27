import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { LAYOUT_ENUM } from '../constans/layout.constans';
import { DBService } from '../service/db.service';
import { LayoutService } from '../service/layout.service';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../app.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  mainPhoto: string;
  smallPhotoKaren: string;
  smallPhotoKlara: string;
  smallPhotoKinia: string;
  smallPhotoMarecki: string;

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
    let promiseMain = this.dbService.getLayoutPhoto('L-onas.jpg').then((url) => {
      this.mainPhoto = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmallKaren = this.dbService.getLayoutPhoto('S-onas-karen.jpg').then((url) => {
      this.smallPhotoKaren = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmallKlara = this.dbService.getLayoutPhoto('S-onas-klara.jpg').then((url) => {
      this.smallPhotoKlara = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmallKinia = this.dbService.getLayoutPhoto('S-onas-kinia.jpg').then((url) => {
      this.smallPhotoKinia = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    let promiseSmallMarecki = this.dbService.getLayoutPhoto('S-onas-marecki.jpg').then((url) => {
      this.smallPhotoMarecki = url;
    })
    .catch((error) => {
      console.warn(error.message);
    });

    Promise.allSettled([promiseMain, promiseSmallKaren, promiseSmallKlara, promiseSmallKinia, promiseSmallMarecki])
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
