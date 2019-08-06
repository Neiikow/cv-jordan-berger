import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptor } from './auth/token.interceptor';

import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageAdminComponent } from './components/pages/page-admin/page-admin.component';
import { PageCvComponent } from './components/pages/page-cv/page-cv.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { InterestComponent } from './components/interest/interest.component';
import { LanguageComponent } from './components/language/language.component';
import { SkillComponent } from './components/skill/skill.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { FormEducationComponent } from './components/education/form-education/form-education.component';
import { FormExperienceComponent } from './components/experience/form-experience/form-experience.component';
import { FormInterestComponent } from './components/interest/form-interest/form-interest.component';
import { FormLanguageComponent } from './components/language/form-language/form-language.component';
import { FormSkillComponent } from './components/skill/form-skill/form-skill.component';

export function tokenGetter(): any {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    PageAdminComponent,
    PageCvComponent,
    HeaderComponent,
    LoginComponent,
    EducationComponent,
    ExperienceComponent,
    InterestComponent,
    LanguageComponent,
    SkillComponent,
    UserInfoComponent,
    FormEducationComponent,
    FormExperienceComponent,
    FormInterestComponent,
    FormLanguageComponent,
    FormSkillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
      },
    }),
  ],
  providers: [
    {
      multi: true,
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
