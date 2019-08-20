import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Portfolio } from 'src/app/class/portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-portfolio',
  templateUrl: './form-portfolio.component.html',
  styleUrls: ['./form-portfolio.component.scss']
})
export class FormPortfolioComponent implements OnInit {

  @Output() refreshPortfolio = new EventEmitter();

  public portfolio: Portfolio;
  private edit = false;
  private dataForm: any;
  private submitted = false;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.initForm();
  }

  public reset(): void {
    this.initForm();
    this.submitted = false;
  }

  private onSubmit(formData: Portfolio): void {
    if (document.activeElement.getAttribute('Title') === 'Reset') {
      return;
    }

    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    if (this.edit) {
      this.portfolioService.editPortfolio(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshPortfolio.emit();
      });
    } else {
      this.portfolioService.addPortfolio(formData).subscribe(e => {
        this.submitted = false;
        this.initForm();
        this.refreshPortfolio.emit();
      });
    }
  }

  public initForm(data?: Portfolio): void {
    if (data) { this.edit = true; } else { this.edit = false; }
    this.dataForm = this.formBuilder.group({
      title: [data ? data.title : null, [Validators.required, Validators.maxLength(255)]],
      category: [data ? data.category : null, [Validators.required, Validators.maxLength(255)]],
      picture: [data ? data.picture : null, [Validators.required, Validators.maxLength(255)]],
      details: [data ? data.details : null, [Validators.required, Validators.maxLength(10000)]],
      id: data ? data.id : null,
    });
    this.portfolio = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
