import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Education } from 'src/app/class/education';
import { EducationService } from 'src/app/services/education.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.scss']
})
export class FormEducationComponent implements OnInit {
  @Output() refreshEducation = new EventEmitter();

  public education: Education;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private educationService: EducationService,
    private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public reset(): void {
    this.initForm();
    this.submitted = false;
  }

  private onSubmit(formData: Education): void {
    if (document.activeElement.getAttribute('Title') === 'Reset') {
      return;
    }

    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    if (this.edit) {
      this.educationService.editEducation(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshEducation.emit();
      });
    } else {
      this.educationService.addEducation(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshEducation.emit();
      });
    }
  }

  public initForm(data?: Education): void {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.dataForm = this.formBuilder.group({
      title: [this.edit ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      company: [this.edit ? data.company : null, [Validators.required, Validators.maxLength(255)]],
      startyear: [this.edit ? data.startyear : null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      endyear: [this.edit ? data.endyear : null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      about: [this.edit ? data.about : null, [Validators.required, Validators.maxLength(10000)]],
      id: this.edit ? data.id : null,
    });
    this.education = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
