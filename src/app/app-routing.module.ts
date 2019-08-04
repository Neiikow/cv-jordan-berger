import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageAdminComponent } from './components/pages/page-admin/page-admin.component';
import { PageCvComponent } from './components/pages/page-cv/page-cv.component';

const routes: Routes = [
  { path: 'cv', component: PageCvComponent },
  { path: 'admin', component: PageAdminComponent },
  { path: '', redirectTo: 'cv', pathMatch: 'full' },
  { path: '**', redirectTo: 'cv', pathMatch: 'full' },
];

@NgModule({
  exports: [
    RouterModule,
  ],
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }
