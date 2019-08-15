import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form-about',
  templateUrl: './form-about.component.html',
  styleUrls: ['./form-about.component.scss']
})
export class FormAboutComponent implements OnInit {
  @Output() refreshUser = new EventEmitter();

  public user: User;
  private dataForm: any;
  private submitted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService) {}

  public ngOnInit(): void {
    this.getUser();
  }

  private getUser(): any {
    this.userService.getUser(1)
      .subscribe(data => {
        this.initForm(data);
      });
  }

  private onSubmit(formData: User): void {
    this.submitted = true;

    if (this.dataForm.invalid) {
      return;
    }

    this.authService.edit(formData).subscribe(e => {
      this.submitted = false;
      this.initForm(formData);
    });
  }

  public initForm(data?: User): void {
    this.dataForm = this.formBuilder.group({
      id: data ? data.id : null,
      username: data ? data.username : null,
      email: [data ? data.email : null, [Validators.required, Validators.maxLength(255)]],
      picture: [data ? data.picture : null, [Validators.required, Validators.maxLength(255)]],
      city: [data ? data.city : null, [Validators.required, Validators.maxLength(255)]],
      street: [data ? data.street : null, [Validators.required, Validators.maxLength(255)]],
      postal: [data ? data.postal : null, [Validators.required, Validators.maxLength(255)]],
      phone: [data ? data.phone : null, [Validators.required, Validators.maxLength(255)]],
      age: [data ? data.age : null, [Validators.required, Validators.maxLength(255)]],
      about: [data ? data.about : null, [Validators.required]],
    });
    this.user = this.dataForm.value;
  }

  public get f(): any { return this.dataForm.controls; }
}
