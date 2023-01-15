import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private counter = 0;
  private loader = new BehaviorSubject(false);
  public readonly loading = this.loader.asObservable();

  setLoading(isLoading: boolean): void {
    isLoading ? this.counter++ : this.counter--;

    this.loader.next(this.counter > 0)
  }
}
