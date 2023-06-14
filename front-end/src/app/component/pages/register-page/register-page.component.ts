import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { iUserRegister } from 'src/app/shared/interfaces/iUserResgister';
import { passwordMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(private fb:FormBuilder,private activatedRoute:ActivatedRoute,
     private userService:UserService, private router:Router){}

  RegisterForm!:FormGroup
  returnUrl = ''
  isSubmited = false

  ngOnInit(): void {

    this.RegisterForm = this.fb.group({
      name:['',[Validators.required,Validators.minLength(3)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmPassword:['',Validators.required],
      address:['', [Validators.required,Validators.minLength(5)]]
    },{
      Validators:passwordMatchValidator('password','confirmPassword')
    })
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl
  }

  get fc(){
    return this.RegisterForm.controls
  }

  submit(){
    this.isSubmited = true
    console.log('hiiii');
    if(this.RegisterForm.invalid) return

    const fv = this.RegisterForm.value

    const user:iUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    }
    // console.log(user);
    this.userService.register(user).subscribe(_ =>{
      this.router.navigateByUrl(this.returnUrl)
    })
  }
}
