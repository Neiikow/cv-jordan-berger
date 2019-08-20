import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Portfolio } from '../class/portfolio';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/portfolio';
  private adminUrl = 'http://localhost:8888/cv-jordan-berger/api/public/api/admin/portfolio';

  constructor(private http: HttpClient) { }

  public getPortfolios(): Observable<any> {
    return this.http.get<Portfolio[]>(this.url);
  }

  public addPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.adminUrl + '/new', portfolio);
  }

  public editPortfolio(portfolio: Portfolio): Observable<Portfolio> {
    return this.http.post<Portfolio>(this.adminUrl + '/edit/' + portfolio.id, portfolio);
  }

  public deletePortfolio(id: number): Observable<any> {
    return this.http.delete<Portfolio>(this.adminUrl + '/delete/' + id)
    .pipe(
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse): any {
    const errorMsg = error.error.message;
    return throwError(errorMsg);
  }
}
