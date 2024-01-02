import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { LoginRequest } from 'src/app/interface/LoginRequest';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private urlHost: string = 'http://localhost:8080/';
 

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");


  constructor(private http:HttpClient) { 
    this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
  }

  login(credentials: LoginRequest):Observable<any>{
    return this.http.post<any>(this.urlHost+'auth/login', credentials).pipe(
      tap((userData) =>{
        //guardamos el token en el sessionStorage
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        this.currentUserLoginOn.next(true);
        try{
          const decodedToken = helper.decodeToken(userData.token);
          const expirationDate = helper.getTokenExpirationDate(userData.token);
          const isExpired = helper.isTokenExpired(userData.token);
          console.log(decodedToken);
          console.log(expirationDate);
          console.log(isExpired);
          } catch(err){
            console.log('Error en el token', err);
          }

      }),
      map((userData)=> userData.token),
      catchError(this.handleError)
    )
  }

  logout():void{
    sessionStorage.removeItem("token");
    this.currentUserData.next("");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error: HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error)
    }else{
      console.error('Backend retorno el codigo de estado ', error.status, error.error)
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente.'))

  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }

  //para acceder al token
  get userToken():String{
    return this.currentUserData.value;
  }
}
