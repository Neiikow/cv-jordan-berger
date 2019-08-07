import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/class/language';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  public languages: Language[];

  constructor(
    private languageService: LanguageService,
    private authService: AuthService) { }

  ngOnInit() {
    this.getLanguages();
  }

  public getLanguages(): void {
    this.languageService.getLanguages()
      .subscribe(data => {
        this.languages = data;
      });
  }

  private delete(language: Language): void {
    this.languageService.deleteLanguage(language.id)
    .subscribe(e => {
      this.getLanguages();
    });
  }

  private isAuth(role: string): boolean {
    if (this.authService.haveRoles(role)) {
      return true;
    }
  }
}
