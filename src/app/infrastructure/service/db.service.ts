import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
    private router: Router
    ) { }

  getAllHorses() {
    const horseList = new Promise<any[]>((resolve)=> {
    this.firestore.collection('Horse').valueChanges({ idField: 'id' }).subscribe(collection => resolve(collection));
    });

    horseList.then((horses) => {
      this.allHorsesList.next(horses)
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

   editHorse(_newId:string, _name:string, _owner:string, _since:string, _image: string) {
    this.firestore.collection('Horse').doc(_newId).update({ id:_newId, name:_name, owner:_owner, since:_since, image: _image})
    .then(() => {
      this.router.navigate(["/animals"]);
    })
    .catch((error) => {
      console.log(error.message);
    });
   }
}
