import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  constructor(
    private afStorage: AngularFireStorage,
    ) { }

  getLayoutPhoto(fileName: string) {
    const photoUrl = new Promise<string>((resolve)=> {
      this.afStorage.ref(`layout/${fileName}`).getDownloadURL().subscribe(data => resolve(data));
      });

    return photoUrl;
  }
}
