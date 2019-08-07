import { Component, ViewChild } from '@angular/core';
import { SkillComponent } from '../../skill/skill.component';
import { EducationComponent } from '../../education/education.component';
import { ExperienceComponent } from '../../experience/experience.component';
import { InterestComponent } from '../../interest/interest.component';
import { LanguageComponent } from '../../language/language.component';
import { FormSkillComponent } from '../../skill/form-skill/form-skill.component';
import { FormEducationComponent } from '../../education/form-education/form-education.component';
import { FormExperienceComponent } from '../../experience/form-experience/form-experience.component';
import { FormInterestComponent } from '../../interest/form-interest/form-interest.component';
import { FormLanguageComponent } from '../../language/form-language/form-language.component';

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

  @ViewChild(FormSkillComponent) formSkill: FormSkillComponent;
  @ViewChild(FormEducationComponent) formEducation: FormEducationComponent;
  @ViewChild(FormExperienceComponent) formExperience: FormExperienceComponent;
  @ViewChild(FormInterestComponent) formInterest: FormInterestComponent;
  @ViewChild(FormLanguageComponent) formLanguage: FormLanguageComponent;

  private refreshSkill(): any {
    this.skill.getSkills();
  }

  private editSkill(skill): any {
    this.formSkill.initForm(skill);
  }

  private refreshEducation(): any {
    this.education.getEducations();
  }

  private editEducation(education): any {
    this.formEducation.initForm(education);
  }

  private refreshExperience(): any {
    this.experience.getExperiences();
  }

  private editExperience(experience): any {
    this.formExperience.initForm(experience);
  }

  private refreshInterest(): any {
    this.interest.getInterests();
  }

  private editInterest(interest): any {
    this.formInterest.initForm(interest);
  }

  private refreshLanguage(): any {
    this.language.getLanguages();
  }

  private editLanguage(language): any {
    this.formLanguage.initForm(language);
  }
}
