import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlHost: string = 'http://localhost:8080/';

  constructor(private http:HttpClient) { }

  getUser(id:number):Observable<User>{
    return this.http.get<User>(this.urlHost + 'api/v1/user/'+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUser(userRequest:User):Observable<any>
  {
    return this.http.put(this.urlHost + 'api/v1/user', userRequest).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producio un error ', error.error);
    }
    else{
      console.error('Backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
  }
}
