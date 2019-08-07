import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'src/app/class/skill';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Skill>();

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

  private edit(skill: Skill): void {
    this.emitEdit.emit(skill);
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
