import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InterestService } from 'src/app/services/interest.service';
import { Interest } from 'src/app/class/interest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {
  @Output() emitEdit = new EventEmitter<Interest>();

  public interests: Interest[];

  constructor(
    private interestService: InterestService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getInterests();
  }

  public getInterests(): void {
    this.interestService.getInterests()
      .subscribe(data => {
        this.interests = data;
      });
  }

  private edit(interest: Interest): void {
    this.emitEdit.emit(interest);
  }

  private delete(interest: Interest): void {
    this.interestService.deleteInterest(interest.id)
    .subscribe(e => {
      this.getInterests();
    });
  }

  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
}
