import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public authservice: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.authservice.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(data: NgForm) {
    if (!(data.value.email && data.value.password)) {
      alert('Please fill the login form');
    }
    else {
      this.authservice.Login(data.value).subscribe((res) => {
        if (res['error']) {
          alert(res['message']);
        }
        else {
          this.authservice.setUser_Auth(res);
          this.router.navigate(['/']);
        }
      }, (err) => {
        console.log(err);
      });
    }

  }

}
