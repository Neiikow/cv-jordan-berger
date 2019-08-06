import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Skill } from '../class/skill';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/skill';

  constructor(private http: HttpClient) { }

  public getSkills(): Observable<any> {
    return this.http.get<Skill[]>(this.url);
  }

  public addSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.url + '/new', skill);
  }

  public editSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(this.url + '/edit/' + skill.id, skill);
  }

  public deleteSkill(id: number): Observable<any> {
    return this.http.delete<Skill>(this.url + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
