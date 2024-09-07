import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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
}
