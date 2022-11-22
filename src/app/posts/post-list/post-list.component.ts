import { Component, OnInit } from "@angular/core";
import { DBService } from "../../infrastructure/service/db.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;
  isLoggedIn = true;
  isEditMode = false;
  allHorses: [];
  allPhotos: any;

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getHorses();
    this.allPhotos = this.dbService.getImageDetailList();
    // console.log(this.allPhotos);
  }

  onOpenModal() {
    this.isEditMode = true;
  }

  onCloseModal() {
    this.isEditMode = false;
  }

  async getHorses() {
    this.allHorses = await this.dbService.getAllHorses();

    // console.log(this.allHorses);

    this.isLoading = false;
  }

  // onAddHorse() {
  //   const postID: string = this.afs.createId();
  //   console.log('postID');
  //   this.dbService.addNewHorse(postID, "New", "Doe", '2020', '/');
  // }

  onDeletePost(event) {
    console.log(event)
  }
}
