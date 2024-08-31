import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apuUrl = environment.apiUrl;
  constructor(private http:HttpClient) {

  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apuUrl}/api/users`);
  }
  getUserById(id: string): Observable<User> {
    let params = new HttpParams();
    params.set('id', id);
    return this.http.get<User>(`${this.apuUrl}/api/users/id/${id}`, { params });
  }
}
