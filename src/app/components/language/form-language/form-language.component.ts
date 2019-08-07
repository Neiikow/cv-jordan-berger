import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Language } from 'src/app/class/language';
import { LanguageService } from 'src/app/services/language.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-language',
  templateUrl: './form-language.component.html',
  styleUrls: ['./form-language.component.scss']
})
export class FormLanguageComponent implements OnInit {
  @Output() refreshLanguage = new EventEmitter();

  public language: Language;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private onSubmit(formData: Language): void {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    this.languageService.addLanguage(formData).subscribe(e => {
      this.submitted = false;
      this.initForm();
      this.refreshLanguage.emit();
    });
  }

  private initForm(data?: Language): void {
    this.dataForm = this.formBuilder.group({
      name: [this.edit ? data.name : null, [Validators.required, Validators.maxLength(255)]],
      id: this.edit ? data.id : null,
    });
    this.language = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
