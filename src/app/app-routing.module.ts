import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth/auth.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { OfferComponent } from "./offer/offer.component";
import { PostCreateComponent } from "./posts/post-create/post-create.component";
import { PostDeleteComponent } from "./posts/post-delete/post-delete.component";
import { PostListComponent } from './posts/post-list/post-list.component';
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: '' , component: HomePageComponent },
  { path: 'home' , component: HomePageComponent },
  { path: 'auth' , component: AuthComponent },
  { path: 'about' , component: AboutComponent },
  { path: 'offer' , component: OfferComponent },
  { path: 'animals' , component: PostListComponent },
  { path: 'contact' , component: ContactComponent },
  { path: 'edit' , component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:postId' , component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'delete/:postId' , component: PostDeleteComponent, canActivate: [AuthGuard] },
  { path: '*' , component: PostListComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
