import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm=this.formuBuilder.group({
    usuario:['', [Validators.required]],
    //email:['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private formuBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    
  }


  get usuario(){
    return this.loginForm.controls.usuario;
  }
  get password(){
    return this.loginForm.controls.password;
  }


  login(){
    if(this.loginForm.valid){
      console.log('llamar al servicio de login');
      this.router.navigateByUrl('inicio');
      this.loginForm.reset;
    }else{
      this.loginForm.markAllAsTouched();
    }
  }

}
