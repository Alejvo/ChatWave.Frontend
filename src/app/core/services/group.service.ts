import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { groupResponse } from '../models/groupResponse';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  createGroup(name:string, description:string):Observable<HttpResponse<any>>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = { name,description }
    return this.http.post<any>(`${this.apiUrl}/api/groups/create`,params,{headers})
    }
  getGroups(): Observable<groupResponse[]> {
    return this.http.get<groupResponse[]>(`${this.apiUrl}/api/groups`)
  }

  getGroupsByName(name:string):Observable<groupResponse[]>{
    let params = new HttpParams();
    params.set('name', name);
    return this.http.get<groupResponse[]>(`${this.apiUrl}/api/groups/${name}`, { params })
  }
}
