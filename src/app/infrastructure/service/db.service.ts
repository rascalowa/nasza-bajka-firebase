import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { Post } from 'src/app/posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  imageDetailList: AngularFireList<any>

  constructor(private firestore: AngularFirestore, private fireStorage: AngularFireDatabase,  private http: HttpClient, private router: Router) { }

  getImageDetailList() {
    this.imageDetailList = this.fireStorage.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList.push(imageDetails);
  }

  getAllHorses() {
    return new Promise<any>((resolve)=> {
    this.firestore.collection('Horse').valueChanges({ id: 'id' }).subscribe(horses => resolve(horses));
    })
  }

  addNewHorse(_newId:string, _name:string, _owner:string, _since:string, _image: string) {
    this.firestore.collection('Horse').doc(_newId).set({ name:_name, owner:_owner, since:_since, image: _image})
    .then(() => {
      console.log('success');
      this.router.navigate(["/animals"]);
    })
    .catch((error) => {
      console.log(error.message);
    });
   }

   onFileUpload() {
    console.log('onFileUpload');
   }
}
