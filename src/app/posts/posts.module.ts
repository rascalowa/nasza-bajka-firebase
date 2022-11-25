import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './../auth/auth.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { AngularMaterialModule } from '../angular-material.module';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent,
    PostCreateComponent,
    PostDeleteComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatCardModule,
    MatDialogModule,
    RouterModule
  ]
})
export class PostsModule {}
