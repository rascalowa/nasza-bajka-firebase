import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
 providedIn: 'root'
})
export class DBService {
  constructor(private db: AngularFirestore) { }

  getAllHorses() {
    return new Promise<any>((resolve)=> {
    this.db.collection('Horse').valueChanges({ id: 'id' }).subscribe(horses => resolve(horses));
    })
  }
}
