import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { PrependBaseUrlPipe } from './infrastructure/pipe/prepend-base.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PostsModule } from './posts/posts.module';
import { ConfigService } from './infrastructure/service/config.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PrependBaseUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PostsModule,
  ],
  providers: [ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
