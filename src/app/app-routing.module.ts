import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageAdminComponent } from './components/pages/page-admin/page-admin.component';
import { PageCvComponent } from './components/pages/page-cv/page-cv.component';
import { RolesGuardService } from './services/roles-guard.service';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'cv', component: PageCvComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: PageAdminComponent, canActivate: [RolesGuardService], data: {roles: 'ROLE_ADMIN'} },
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
  providers: [
    RolesGuardService,
  ],
})
export class AppRoutingModule { }
