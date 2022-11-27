import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { DBService } from "src/app/service/db.service";
import { Post } from "../post.model";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, take } from "rxjs/operators";

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
  postToEdit: Post;
  photoChange = false;
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

        this.dbService.allHorsesList
          .pipe(take(1))
          .subscribe((res) => {
            this.postToEdit = res.find(horse => horse.id === this.postId) ?? res[0];

            this.postCreateForm.patchValue({
              name: this.postToEdit?.name,
              owner: this.postToEdit?.owner,
              since: this.postToEdit?.since
            });
            this.isLoading = false;
          }
        )
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  togglePhotoChange() {
    this.photoChange = !this.photoChange;
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
      if (this.photoChange) {
        this.saveImageToStorage(this.postId, form);
      } else {
        this.postCreateForm['image'] = this.postToEdit.image;
        this.saveHorseDetails(this.postId, form);
      }
    }
  }

  saveImageToStorage(postID: string, form) {
    const filePath = `horses/${postID}`;
    const fileRef = this.afStorage.ref(filePath);

    this.afStorage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.postCreateForm['image'] = url;
          this.saveHorseDetails(postID, form);
        })
      })
    ).subscribe();
  }

  saveHorseDetails(postID, form) {
    const horse: Post = {
      id: postID,
      since: form.since,
      name: form.name,
      owner: form.owner,
      image: this.postCreateForm['image']
    }
    this.dbService.addNewHorse(horse);
  }

  resetForm() {
    this.postCreateForm.reset();
    this.isLoading = false;
    this.selectedImage = null;
  }
}

