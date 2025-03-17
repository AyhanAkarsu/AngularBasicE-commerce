import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable} from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  constructor(private authService: AuthService, private router: Router) {}

  isloginMode: boolean = true
  message = ""
  durum = ""
  loading:boolean = false

  toogleMode() {
    this.isloginMode = !this.isloginMode
  }

  handleAuth(form: NgForm) {
    if(!form.valid) {
      this.message = "Form bilgilerini kontrol ediniz."
      this.durum = "danger"
      return
    }

    this.loading = true
    const email = form.value.email
    const password = form.value.password
    let authResponse: Observable<AuthResponse>
    if(this.isloginMode) {
       authResponse = this.authService.login(email, password)
    }else {
      authResponse = this.authService.register(email, password)
    }
    authResponse.subscribe({
      next: () =>{
        this.loading = false
        this.durum = "success"
        if(this.isloginMode) {
          this.message = "Giriş işlemi başarılı.."
          setTimeout(() => {
            this.router.navigate(["/"])
          },700)
          
        }else {
          this.message = "Kayıt olma işlemi başarılı.."
        }
      },
      error: (err) => {
        this.loading = false
        this.durum = "danger"
        this.message = err
      }
    })

  }
}
