import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { Education } from 'src/app/class/education';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Education>();

  public educations: Education[];

  constructor(
    private educationService: EducationService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getEducations();
  }

  public getEducations(): void {
    this.educationService.getEducations()
      .subscribe(data => {
        this.educations = data;
      });
  }

  private edit(education: Education): void {
    this.emitEdit.emit(education);
  }

  private delete(education: Education): void {
    this.educationService.deleteEducation(education.id)
    .subscribe(e => {
      this.getEducations();
    });
  }

  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
}
