import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAdminComponent } from './components/pages/page-admin/page-admin.component';
import { PageCvComponent } from './components/pages/page-cv/page-cv.component';

@NgModule({
  declarations: [
    AppComponent,
    PageAdminComponent,
    PageCvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
