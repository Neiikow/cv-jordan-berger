import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/class/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public dataForm: FormGroup;
  public id = false;
  public submitted = false;
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  public ngOnInit(): void {
    this.initForm();
  }
  public onSubmit(formData: User): void {
    this.submitted = true;
    if (this.dataForm.invalid) {
      return;
    }

    this.authService.login(formData).subscribe(
      (next) => {
        localStorage.setItem('token', next['token']);
        localStorage.setItem('refresh_token', next['refresh_token']);
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/admin']);
        }
      },
      (error) => {
        this.error = error;
        this.intervalError();
      },
    );
  }

  private initForm(): void {
    this.dataForm = this.formBuilder.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  public get f(): any { return this.dataForm.controls; }

  private intervalError(): void {
    setTimeout(
      () => {
        this.error = '';
        this.submitted = null;
        clearInterval();
      }, 3000,
    );
  }
}
