import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'
import { BehaviorSubject } from 'rxjs';
import { LAYOUT_ENUM } from '../constans/layout.constans';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  size$ = new BehaviorSubject<LAYOUT_ENUM>(LAYOUT_ENUM.MEDIUM);

  displayMap = new Map([
    [Breakpoints.XSmall, LAYOUT_ENUM.XSMALL],
    [Breakpoints.Small, LAYOUT_ENUM.SMALL],
    [Breakpoints.Medium, LAYOUT_ENUM.MEDIUM],
    [Breakpoints.Large, LAYOUT_ENUM.LARGE]
  ])
  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
    ]).subscribe(result => {
      for(let query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.size$.next(this.displayMap.get(query))
        }
      }
    })
  }

}
