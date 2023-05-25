import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Post } from 'src/app/posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  allHorsesList: BehaviorSubject<Post[]> = new BehaviorSubject([]);

  constructor(
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router
    ) { }

  getLayoutPhoto(fileName: string) {
    const photoUrl = new Promise<string>((resolve)=> {
      this.afStorage.ref(`layout/${fileName}`).getDownloadURL().subscribe(data => resolve(data));
      });

    return photoUrl;
  }

  getAllHorses() {
    const horseList = new Promise<any[]>((resolve)=> {
    this.firestore.collection('Horse').valueChanges({ idField: 'id' }).subscribe(collection => resolve(collection));
    });

    horseList.then((horses) => {
      this.allHorsesList.next(horses);
    })
    .catch((error) => {
      console.log(error.message);
    });

    return horseList;
  }

  addNewHorse(horse: Post) {
    this.firestore.collection('Horse').doc(horse.id).set({
      id: horse.id,
      name: horse.name,
      owner: horse.owner,
      since: horse.since,
      image: horse.image
    })
    .then(() => {
      this.router.navigate(["/animals"]);
    })
    .catch((error) => {
      console.log(error.message);
    });
   }

   deleteHorse(_id:string) {
    this.firestore.doc(`Horse/${_id}`).delete()
      .then(() => {
        this.router.navigate(["/animals"]);
        this.router
      })
      .catch((error) => {
        console.log(error.message);
      });
    }
}
