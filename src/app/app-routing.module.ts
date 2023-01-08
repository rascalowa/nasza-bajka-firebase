import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { OfferComponent } from "./offer/offer.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home' , component: HomePageComponent },
  { path: 'about' , component: AboutComponent },
  { path: 'offer' , component: OfferComponent },
  { path: 'contact' , component: ContactComponent },
  { path: '*' , component: HomePageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
