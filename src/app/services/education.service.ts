import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Education } from '../class/education';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/education';

  constructor(private http: HttpClient) { }

  public getEducations(): Observable<any> {
    return this.http.get<Education[]>(this.url);
  }

  public addEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.url + '/new', education);
  }

  public editEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(this.url + '/edit/' + education.id, education);
  }

  public deleteEducation(id: number): Observable<any> {
    return this.http.delete<Education>(this.url + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
