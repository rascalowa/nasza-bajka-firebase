import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DBService } from "src/app/infrastructure/service/db.service";
import { Post } from "../post.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from "rxjs/operators";


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  post: Post;
  isLoading = false;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  file: string;
  selectedImage: any = null;

  postCreateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    owner: new FormControl(''),
    since: new FormControl(''),
    image: new FormControl(null, Validators.required)
  });

  constructor(
    public route: ActivatedRoute,
    private af: AngularFirestore,
    private afStorage: AngularFireStorage,
    private dbService: DBService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        console.log(this.postId);

        // this.postsService.getPost(this.postId).subscribe(postData => {
        //   this.isLoading = false;
        //   this.post = {id: postData.id, name: postData.name, owner: postData.owner, imagePath: postData.imagePath };
        //   this.form.setValue({
        //     name: this.post.name,
        //     owner: this.post.owner,
        //     image: this.post.imagePath
        //   });
        // });
        console.log('COMMENTED')
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onImagePicked(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postCreateForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.selectedImage = file;
  }

  onSavePost(form) {
    this.isLoading = true;

    if (this.mode === "create") {
      const postID: string = this.af.createId();
      this.saveImageToStorage(postID, form);
    } else {
      // this.postsService.updatePost(
      //   this.postId,
      //   this.form.value.name,
      //   this.form.value.owner
      // );
      console.log('TO BE UPDATED')
    }
    this.postCreateForm.reset();
  }

  saveImageToStorage(postID: string, form) {
    const filePath = `horses/${postID}`;
    const fileRef = this.afStorage.ref(filePath);

    this.afStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.postCreateForm['image'] = url;
          this.saveImageDetails(postID, form);
        })
      })
    ).subscribe();
  }

  saveImageDetails(postID, form) {
    console.log(form.image);

    this.dbService.addNewHorse(
      postID,
      form.name,
      form.owner,
      form.since,
      form.image
      );
  }

  resetForm() {
    this.postCreateForm.reset();
    // this.postCreateForm.setValue({
    //   name: '',
    //   owner: '',
    //   since:'',
    //   image: null
    // })
    this.isLoading = false;
    this.selectedImage = null;
  }
}

