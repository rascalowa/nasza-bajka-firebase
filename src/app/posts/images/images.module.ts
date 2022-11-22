import { ImageListComponent } from './image-list/image-list.component';
import { ImageComponent } from './image/image.component';
import { ImagesComponent } from './images.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImagesComponent,
    ImageComponent,
    ImageListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class ImagesModule {}
