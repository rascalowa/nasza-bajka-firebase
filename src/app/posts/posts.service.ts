import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Post } from "./post.model";

// const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('BACKEND_URL')
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              name: post.name,
              owner: post.owner,
              id: post.id,
              imagePath: post.imagePath
            };
          });
        })
      )
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: number) {
    return this.http.get<{ id: number, name: string, owner: string, imagePath: string }>(
      'BACKEND_URL' + id
    );
  }

  addPost(name: string, owner: string, image: File) {
    const postData = new FormData();
    postData.append('name', name);
    postData.append('owner', owner);
    postData.append('image', image, name);


    this.http
      .post<{ message: string; post: Post }>(
        'BACKEND_URL',
        postData
      )
      .subscribe(responseData => {
        const post: Post = {
          id: responseData.post.id,
          name: name,
          owner: owner,
          imagePath: responseData.post.imagePath
        };
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: number, name: string, owner: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('name', name);
      postData.append('owner', owner);
      postData.append('image', image, name);
    } else {
      postData = { id: id, name: name, owner: owner, imagePath: image };
    }

    this.http
      .put('BACKEND_URL' + id, postData)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
        const post : Post = { id: id, name: name, owner: owner, //imagePath: image
      };
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('BACKEND_URL' + postId)
      .subscribe(() => {
        // const updatedPosts = this.posts.filter(post => post.id !== postId);
        // this.posts = updatedPosts;
        // this.postsUpdated.next([...this.posts]);
      });
  }
}
