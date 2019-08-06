import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { Language } from 'src/app/class/language';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {
  public languages: Language[];

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.getLanguages();
  }

  private getLanguages(): void {
    this.languageService.getLanguages()
      .subscribe(data => {
        this.languages = data;
      });
  }
}
