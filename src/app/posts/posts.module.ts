import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostCreateComponent,
    PostDeleteComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule
  ]
})
export class PostsModule {}
