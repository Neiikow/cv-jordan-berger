import { Component, OnInit } from '@angular/core';
import { InterestService } from 'src/app/services/interest.service';
import { Interest } from 'src/app/class/interest';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {
  public interests: Interest[];

  constructor(private interestService: InterestService) { }

  ngOnInit() {
    this.getInterests();
  }

  public getInterests(): void {
    this.interestService.getInterests()
      .subscribe(data => {
        this.interests = data;
      });
  }
}
