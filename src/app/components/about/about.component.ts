import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/class/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getUser(1)
      .subscribe(data => {
        this.user = data;
      });
  }
}
