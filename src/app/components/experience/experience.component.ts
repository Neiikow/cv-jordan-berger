import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from 'src/app/class/experience';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Experience>();

  public experiences: Experience[];

  constructor(
    private experienceService: ExperienceService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getExperiences();
  }

  public getExperiences(): void {
    this.experienceService.getExperiences()
      .subscribe(data => {
        this.experiences = data;
      });
  }

  private edit(experience: Experience): void {
    this.emitEdit.emit(experience);
  }

  private delete(experience: Experience): void {
    this.experienceService.deleteExperience(experience.id)
    .subscribe(e => {
      this.getExperiences();
    });
  }

  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
}
