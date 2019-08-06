import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Experience } from '../class/experience';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/experience';

  constructor(private http: HttpClient) { }

  public getExperiences(): Observable<any> {
    return this.http.get<Experience[]>(this.url);
  }

  public addExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.url + '/new', experience);
  }

  public editExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(this.url + '/edit/' + experience.id, experience);
  }

  public deleteExperience(id: number): Observable<any> {
    return this.http.delete<Experience>(this.url + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
