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

  private onSubmit(formData: Skill): void {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    this.skillService.addSkill(formData).subscribe(e => {
      this.submitted = false;
      this.initForm();
      this.refreshSkill.emit();
    });
  }

  private initForm(data?: Skill): void {
    this.dataForm = this.formBuilder.group({
      title: [this.edit ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      details: [this.edit ? data.details : null, [Validators.required, Validators.maxLength(10000)]],
      id: this.edit ? data.id : null,
    });
    this.skill = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
