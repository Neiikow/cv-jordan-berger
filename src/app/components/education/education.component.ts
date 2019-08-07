import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/services/education.service';
import { Education } from 'src/app/class/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  public educations: Education[];

  constructor(private educationService: EducationService) { }

  ngOnInit() {
    this.getEducations();
  }

  public getEducations(): void {
    this.educationService.getEducations()
      .subscribe(data => {
        this.educations = data;
      });
  }
}
