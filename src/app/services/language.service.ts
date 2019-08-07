import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Language } from '../class/language';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/language';
  private adminUrl = 'http://localhost:8888/cv-jordan-berger/api/public/api/admin/language';

  constructor(private http: HttpClient) { }

  public getLanguages(): Observable<any> {
    return this.http.get<Language[]>(this.url);
  }

  public addLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(this.adminUrl + '/new', language);
  }

  public editLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(this.adminUrl + '/edit/' + language.id, language);
  }

  public deleteLanguage(id: number): Observable<any> {
    return this.http.delete<Language>(this.adminUrl + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
