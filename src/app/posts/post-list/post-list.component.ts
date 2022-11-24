import { Component, OnInit } from "@angular/core";
import { DBService } from "../../infrastructure/service/db.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  isLoading = false;
  isLoggedIn = true;
  isEditMode = false;
  allHorses: Post[] = [];

  constructor(private dbService: DBService) {}

  ngOnInit() {
    this.isLoading = true;
    this.getHorses();
  }

  onOpenModal() {
    this.isEditMode = true;
  }

  onCloseModal() {
    this.isEditMode = false;
  }

  async getHorses() {
    this.allHorses = await this.dbService.getAllHorses();
    this.isLoading = false;
  }

  onDeletePost(event) {
    console.log(event)
  }
}
