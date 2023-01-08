import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';

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
