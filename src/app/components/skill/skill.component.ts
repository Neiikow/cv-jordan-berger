import { Component, OnInit } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'src/app/class/skill';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  public skills: Skill[];

  constructor(
    private skillService: SkillService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getSkills();
  }

  public getSkills(): void {
    this.skillService.getSkills()
      .subscribe(data => {
        this.skills = data;
      });
  }

  private delete(skill: Skill): void {
    this.skillService.deleteSkill(skill.id)
    .subscribe(e => {
      this.getSkills();
    });
  }

  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
}
