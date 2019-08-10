import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Skill } from 'src/app/class/skill';
import { SkillService } from 'src/app/services/skill.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.scss']
})
export class FormSkillComponent implements OnInit {
  @Output() refreshSkill = new EventEmitter();

  public skill: Skill;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private skillService: SkillService,
    private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public reset(): void {
    this.initForm();
    this.submitted = false;
  }

  private onSubmit(formData: Skill): void {
    if (document.activeElement.getAttribute('Title') === 'Reset') {
      return;
    }

    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    if (this.edit) {
      this.skillService.editSkill(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshSkill.emit();
      });
    } else {
      this.skillService.addSkill(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshSkill.emit();
      });
    }
  }

  public initForm(data?: Skill): void {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.dataForm = this.formBuilder.group({
      title: [data ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      details: [data ? data.details : null, [Validators.required, Validators.maxLength(10000)]],
      id: data ? data.id : null,
    });
    this.skill = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
