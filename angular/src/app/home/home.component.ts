import { Component, OnInit } from '@angular/core';
import { AuthService  } from '../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    public authservice: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.authservice.isLoggedIn()){
      this.authservice.getUserData();
    }
    else{
        this.router.navigate(['/login']);
    }
  }

  onLogout(){
    this.authservice.Logout();
  }

}
