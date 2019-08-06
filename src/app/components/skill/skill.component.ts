import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'src/app/class/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  public skills: Skill[];

  constructor(private skillService: SkillService) { }

  ngOnInit() {
    this.getSkills();
  }

  private getSkills(): void {
    this.skillService.getSkills()
      .subscribe(data => {
        this.skills = data;
      });
  }
}
