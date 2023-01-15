import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { takeUntil, Subject } from 'rxjs';
import { LoaderService } from './service/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  isLoading = false;

  constructor(
    private readonly loaderService: LoaderService,
    private readonly cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.setupLoader();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private setupLoader(): void {
    this.loaderService.loading.pipe(takeUntil(this.unsubscribe$)).subscribe((isLoading) => {
      this.isLoading = isLoading;
      this.cd.detectChanges();
    });
  }
}
