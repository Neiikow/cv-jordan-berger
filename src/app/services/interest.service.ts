import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Interest } from '../class/interest';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterestService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/interest';

  constructor(private http: HttpClient) { }

  public getInterests(): Observable<any> {
    return this.http.get<Interest[]>(this.url);
  }

  public addInterest(interest: Interest): Observable<Interest> {
    return this.http.post<Interest>(this.url + '/new', interest);
  }

  public editInterest(interest: Interest): Observable<Interest> {
    return this.http.post<Interest>(this.url + '/edit/' + interest.id, interest);
  }

  public deleteInterest(id: number): Observable<any> {
    return this.http.delete<Interest>(this.url + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
