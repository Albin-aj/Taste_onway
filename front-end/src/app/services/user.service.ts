import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { iUserlogin } from '../shared/interfaces/iUserLogin';
import { ToastrService } from 'ngx-toastr';
import { iUserRegister } from '../shared/interfaces/iUserResgister';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';


const User_Key = "userLogin"

@Injectable({
  providedIn: 'root'
})

export class UserService {


  private userSubject = new BehaviorSubject<user>(this.getUserFromLocalstorage())
  public userObservable!: Observable<user>;

  constructor(private http:HttpClient, private toaster:ToastrService) {
    this.userObservable = this.userSubject
  }

  login(userLogin:iUserlogin):Observable<user>{
    // console.log(userLogin);
      return this.http.post<user>(USER_LOGIN_URL,userLogin).pipe(tap({
        next:(user)=>{
          this.setUserToLocalstorage(user)
          this.userSubject.next(user)
          this.toaster.success(`Welcome to DeliBro ${user.name}!`, 'Login Successful')
        },
        error:(errorResponse)=>{
          this.toaster.error(errorResponse.error, 'Login Failed')
        }
      }))
  }

  register(userRegister:iUserRegister):Observable<user>{
    console.log(userRegister);
    return this.http.post<user>(USER_REGISTER_URL,userRegister).pipe(tap({
      next:(user)=> {
        this.setUserToLocalstorage(user)
        this.userSubject.next(user)
        this.toaster.success(`Welcome to DelBro ${user.name}`,
        "Register successful!")
      },
      error:(errorResponse)=>{
        this.toaster.error(errorResponse.error,"Register failed")
      }
    }))
  }

  logout(){
    this.userSubject.next(new user())
    localStorage.removeItem(User_Key)
    window.location.reload()
  }

  private setUserToLocalstorage(user:user){
    localStorage.setItem(User_Key, JSON.stringify(user))
  }

  private getUserFromLocalstorage(){
    const userJson = localStorage.getItem(User_Key)
    if(userJson) return JSON.parse(userJson) as user
    return new user()
  }
  }


