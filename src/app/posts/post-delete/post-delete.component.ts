import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { take, tap } from "rxjs/operators";
import { DBService } from "src/app/service/db.service";
import { Post } from "../post.model";

@Component({
  selector: "app-post-delete",
  templateUrl: "./post-delete.component.html",
  styleUrls: ["./post-delete.component.css"]
})
export class PostDeleteComponent implements OnInit {
  postToDelete: Post;

  constructor(
    public route: ActivatedRoute,
    private dbService: DBService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const postId = paramMap.get("postId");
      this.dbService.allHorsesList
        .pipe(take(1))
        .subscribe((res) => {
          this.postToDelete = res.find(horse => horse.id === postId) ?? res[0];
        }
      )
    });
  }

  onDelete() {
    this.dbService.deleteHorse(this.postToDelete.id);
  }
}
