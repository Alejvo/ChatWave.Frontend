import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap,map, catchError, of } from 'rxjs';
import { tokenResponse } from 'src/app/core/models/tokenResponse';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) 
  {

  }

  private apiUrl = environment.apiUrl;
  private decodeToken(token:string):any{
    try{
      return jwtDecode(token);
    }catch(error){
      console.error('Token error',error);
      return null;
    }
  }
  getUserInfoFromToken(token:string):{userId:string,username:string}|null{
    const decodedToken = this.decodeToken(token);
    if(decodedToken){
      const userId = decodedToken.sub;
      const username = decodedToken.unique_name;
      return {userId,username}
    }
    return null;
  }
  login(email:string,password:string):Observable<boolean>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    const params = {email,password}
    return this.http.post<any>(`${this.apiUrl}/api/users/login`,params,{headers,observe:'response'})
    .pipe(
      map((response)=>{   
        if(response.status === 200 && response.body.token){
          localStorage.setItem('token',response.body.token);
          return true;
        }
        return false;
      }),
      catchError(error=>{
        console.error('Login Failed',error);
        return of(false);
      })
    )
  }

  logout():void{
    localStorage.removeItem('token');
  }

  isLoggedIn():boolean{
    return localStorage.getItem('token') !== null;
  }

  getToken():string | null{
    return localStorage.getItem('token');
  }
}
