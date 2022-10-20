import { Component, OnInit, OnDestroy } from "@angular/core";
import { DBService } from "../../infrastructure/service/db.service";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  isLoading = false;

  allHorses: [];

  constructor(public postsService: PostsService, private dbService: DBService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getHorses();
  }

  async getHorses() {
    this.allHorses = await this.dbService.getAllHorses();
    console.log(this.allHorses);
    this.isLoading = false;
   }
}
