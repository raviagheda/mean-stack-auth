import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly baseUrl = 'http://localhost:3000/api/auth/';
  currentUser;
  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn(){
      if(localStorage.length > 0){
        return true;
      }
      return false;
  }

  getUserData(){
    if(this.isLoggedIn()){
      if(sessionStorage.length > 0){
        this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      }
      else{
        var a_token = localStorage.getItem('a_token');
        this.onLoad(a_token).subscribe((res)=>{
          if(res['tokenExpired']){
            this.refreshToken();
          }
          else if(res['userNotFound']){
            alert('user does not exist anymore');
            this.Logout();
          }
          else{
            this.currentUser = res;
          }
        });
      }
    }
    else{
      this.router.navigate(['/login']);
    }
  }

  refreshToken(){
    var r_token = localStorage.getItem('r_token');
    var header = new HttpHeaders().set("Authorization","Bearer " + r_token);

    localStorage.removeItem('a_token');

    this.http.post(this.baseUrl + 'refreshToken',{refreshToken: true},{headers: header}).subscribe((res)=>{
      localStorage.setItem('a_token',res['a_token']);
      this.getUserData();
    });
  }

  setUser_Auth(userData){
    this.currentUser = userData['data'];
    sessionStorage.setItem('currentUser', JSON.stringify(userData['data']));
    localStorage.setItem('a_token', userData['a_token']);
    localStorage.setItem('r_token',userData['r_token']);
  }

  onLoad(a_token){
    var header = new HttpHeaders().set("Authorization","Bearer " + a_token);
    return this.http.get(this.baseUrl + 'authenticate',{headers: header});
  }

  Login(data){
    return this.http.post(this.baseUrl+'login',data);
  }

  Signup(data){
    return this.http.post(this.baseUrl + 'signup',data);
  }

  Logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
