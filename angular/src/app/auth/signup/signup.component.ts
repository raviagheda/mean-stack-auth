import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authservice: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authservice.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onSubmit(data: NgForm){
    if(!(data.value.email && data.value.password && data.value.name)){
      alert('Please fill all the field');
    }
    else{
      this.authservice.Signup(data.value).subscribe((res)=>{      
        if(res['emailExist']){
          alert('Email already exist');
        }
        else{
          this.authservice.setUser_Auth(res);
          this.router.navigate(['/']);
        }
      },(err)=>{
        console.log(err);
      })
    }
    
  }
}
