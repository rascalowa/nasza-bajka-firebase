import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from "./posts/post-create/post-create.component";

import { PostListComponent } from './posts/post-list/post-list.component';

const routes: Routes = [
  { path: '' , component: PostListComponent },
  { path: 'szefowa' , component: PostCreateComponent },
  { path: 'edit/:postId' , component: PostCreateComponent },
  { path: '*' , component: PostListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
