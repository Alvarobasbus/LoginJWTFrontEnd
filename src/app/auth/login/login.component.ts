import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interface/LoginRequest';
import { LoginServiceService } from 'src/app/services/auth/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError:string="";
  loginForm=this.formuBuilder.group({
    username:['', [Validators.required]],
    //email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private formuBuilder: FormBuilder, private router: Router, private loginService: LoginServiceService){

  }

  ngOnInit(): void {
    
  }


  get usuario(){
    return this.loginForm.controls.username;
  }
  get password(){
    return this.loginForm.controls.password;
  }


  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }
      })
    }else{
      this.loginForm.markAllAsTouched(); // para marcar todos los inputs para que sean visibles cual faltan
      alert("Error al ingresar los datos.");
    }
  }

}
