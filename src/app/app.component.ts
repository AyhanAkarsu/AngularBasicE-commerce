
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {
  title = 'angular-app';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin() 
  }
  }
