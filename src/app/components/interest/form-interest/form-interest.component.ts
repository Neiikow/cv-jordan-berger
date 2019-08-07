import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Interest } from 'src/app/class/interest';
import { InterestService } from 'src/app/services/interest.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-interest',
  templateUrl: './form-interest.component.html',
  styleUrls: ['./form-interest.component.scss']
})
export class FormInterestComponent implements OnInit {
  @Output() refreshInterest = new EventEmitter();

  public interest: Interest;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private interestService: InterestService,
    private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public reset(): void {
    this.initForm();
  }

  private onSubmit(formData: Interest): void {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    if (this.edit) {
      this.interestService.editInterest(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshInterest.emit();
      });
    } else {
      this.interestService.addInterest(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshInterest.emit();
      });
    }
  }

  public initForm(data?: Interest): void {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.dataForm = this.formBuilder.group({
      title: [this.edit ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      details: [this.edit ? data.details : null, [Validators.required, Validators.maxLength(10000)]],
      id: this.edit ? data.id : null,
    });
    this.interest = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
