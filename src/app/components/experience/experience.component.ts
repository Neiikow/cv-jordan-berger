import { Component, OnInit } from '@angular/core';
import { ExperienceService } from 'src/app/services/experience.service';
import { Experience } from 'src/app/class/experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  public experiences: Experience[];

  constructor(private experienceService: ExperienceService) { }

  ngOnInit() {
    this.getExperiences();
  }

  public getExperiences(): void {
    this.experienceService.getExperiences()
      .subscribe(data => {
        this.experiences = data;
      });
  }
}
