import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Experience } from 'src/app/class/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-experience',
  templateUrl: './form-experience.component.html',
  styleUrls: ['./form-experience.component.scss']
})
export class FormExperienceComponent implements OnInit {
  @Output() refreshExperience = new EventEmitter();

  public experience: Experience;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private experienceService: ExperienceService,
    private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public reset(): void {
    this.initForm();
  }

  private onSubmit(formData: Experience): void {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    if (this.edit) {
      this.experienceService.editExperience(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshExperience.emit();
      });
    } else {
      this.experienceService.addExperience(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshExperience.emit();
      });
    }
  }

  public initForm(data?: Experience): void {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.dataForm = this.formBuilder.group({
      function: [this.edit ? data.function : null, [Validators.required, Validators.maxLength(255)]],
      company: [this.edit ? data.company : null, [Validators.required, Validators.maxLength(255)]],
      startyear: [this.edit ? data.startyear : null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      endyear: [this.edit ? data.endyear : null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      about: [this.edit ? data.about : null, [Validators.required, Validators.maxLength(10000)]],
      id: this.edit ? data.id : null,
    });
    this.experience = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
