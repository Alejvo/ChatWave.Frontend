import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { User } from '../models/users/user';
import { environment } from 'src/environments/environment.development';
import { groupResponse } from '../models/groupResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) {

  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/api/users`);
  }
  getUserById(id: string): Observable<User> {
    let params = new HttpParams();
    params.set('id', id);
    return this.http.get<User>(`${this.apiUrl}/api/users/id/${id}`, { params })
    
  }
  getUsersByUsername(username: string): Observable<User[]> {
    let params = new HttpParams();
    params.set('username', username);
    return this.http.get<User[]>(`${this.apiUrl}/api/users/username/${username}`, { params })

  }
  registerUser(
    firstname:string,
    lastname:string,
    email:string,
    password:string,
    username:string,
    birthday: Date):Observable<HttpResponse<any>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const params ={firstname,lastname,email,password,username,birthday}
      return this.http.post<any>(`${this.apiUrl}/api/users/register`,params,{headers});
  }

  addToGroup(groupId: string, userId: string): Observable<HttpResponse<any>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = {groupId,userId}
    return this.http.post<any>(`${this.apiUrl}/api/groups/add-user`, params, { headers, observe: 'response' }).pipe(
      tap(response => console.log(response.body)))
  }
  addToFriend(userId: string, friendId: string): Observable<HttpResponse<any>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = {userId,friendId }
    return this.http.post<any>(`${this.apiUrl}/api/users/add-friend`, params,{headers,observe:'response'})
  }
}
