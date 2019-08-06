import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8888/cv-jordan-berger/api/public/api/users';

  constructor(private http: HttpClient) { }

  public getUser(id: number): Observable<any> {
    return this.http.get<User[]>(this.url + '/view/' + id);
  }
}
