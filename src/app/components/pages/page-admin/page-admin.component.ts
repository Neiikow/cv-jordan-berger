import { Component, ViewChild } from '@angular/core';
import { SkillComponent } from '../../skill/skill.component';
import { EducationComponent } from '../../education/education.component';
import { ExperienceComponent } from '../../experience/experience.component';
import { InterestComponent } from '../../interest/interest.component';
import { LanguageComponent } from '../../language/language.component';

@Component({
  selector: 'app-page-admin',
  templateUrl: './page-admin.component.html',
  styleUrls: ['./page-admin.component.scss']
})
export class PageAdminComponent {
  @ViewChild(SkillComponent) skill: SkillComponent;
  @ViewChild(EducationComponent) education: EducationComponent;
  @ViewChild(ExperienceComponent) experience: ExperienceComponent;
  @ViewChild(InterestComponent) interest: InterestComponent;
  @ViewChild(LanguageComponent) language: LanguageComponent;

  private refreshSkill(): any {
    this.skill.getSkills();
  }

  private refreshEducation(): any {
    this.education.getEducations();
  }

  private refreshExperience(): any {
    this.experience.getExperiences();
  }

  private refreshInterest(): any {
    this.interest.getInterests();
  }

  private refreshLanguage(): any {
    this.language.getLanguages();
  }
}
