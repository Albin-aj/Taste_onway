import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  retrunUrl = ""

  loginForm!:FormGroup
  isSubmitted:boolean = false

  constructor(private fb:FormBuilder,private userService:UserService,
    private activaterRoute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['',Validators.required]
    })

    this.retrunUrl = this.activaterRoute.snapshot.queryParams.retrunUrl
  }

  get fc(){
    return this.loginForm.controls
  }

  submit(){
    this.isSubmitted = true
    if(this.loginForm.invalid) return

    this.userService.login({email:this.fc.email.value, password:this.fc.password.value}).subscribe(()=>{
      this.router.navigateByUrl(this.retrunUrl)
    })
  }

}
