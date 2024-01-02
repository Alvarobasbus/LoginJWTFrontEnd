import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user';
import { LoginServiceService } from 'src/app/services/auth/login-service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {
  errorMessage:String="";
  user?:User;
  userLoginOn:boolean=false;
  editMode:boolean=false;

  registerForm=this.formBuilder.group({
    id:[''],
    lastname:['',Validators.required],
    firstname:['', Validators.required],
    country:['',Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private userService: UserService, private loginService: LoginServiceService){
    this.userService.getUser(2).subscribe({
      next: (response) =>{
        this.user=response
        this.registerForm.controls.id.setValue(response.id.toString());
        this.registerForm.controls.firstname.setValue( response.firstname);
        this.registerForm.controls.lastname.setValue( response.lastname);
        this.registerForm.controls.country.setValue( response.country);
      },
      error: (errorData) => {
        this.errorMessage=errorData
      },
      complete: () => {
        console.info("user Data Ok");
        console.log(this.user);
      }
    })

    this.loginService.userLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })


    
  }

  get firstname()
  {
    return this.registerForm.controls.firstname;
  }

  get lastname()
  {
    return this.registerForm.controls.lastname;
  }

  get country()
  {
    return this.registerForm.controls.country;
  }

  savePersonalDetailsData()
  {
    if (this.registerForm.valid)
    {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next:() => {
          this.editMode=false;
          this.user=this.registerForm.value as unknown as User;
        },
        error:(errorData)=> console.error(errorData)
      })
    }
  }
  

}
