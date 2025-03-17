import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URLsignUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAETwXg_VHYGeWs6ndivzIzUaAANZCb6ng"
  URLsignIn = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAETwXg_VHYGeWs6ndivzIzUaAANZCb6ng"
  user = new BehaviorSubject<User | null>(null)
  constructor(private http: HttpClient) { }

  register(email: string, password:string) {
    return this.http.post<AuthResponse>(this.URLsignUp, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap((response) => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn)
         }),
      catchError(this.handleError))
  }
  
  login(email: string, password: string) {
    return this.http.post<AuthResponse>(this.URLsignIn, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => {
        this.handleUser(response.email, response.localId, response.idToken, response.expiresIn)
         }),
      catchError(this.handleError))
  }

  private handleUser(email:string, localId: string, idToken:string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000))
    const user = new User(
      email,
      localId,
      idToken,
      expirationDate
    )
    this.user.next(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  autoLogin() {
    if(localStorage.getItem("user") == null) return
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const loadedUser = new User(user.email, user.id, user._token, new Date(user._tokenExpirationDate))
    if(loadedUser.token) {
      this.user.next(loadedUser)
    }
  }

  autoOut() {
    this.user.next(null)
    localStorage.removeItem("user")
  }

  private handleError(err: HttpErrorResponse) {
    let message = "Hata Oluştu"
    if(err.error.error) {
       switch(err.error.error.message) {
      case("INVALID_LOGIN_CREDENTIALS"):
         message = "Geçersi̇z gi̇ri̇ş bi̇lgi̇leri̇"
      break
      case("EMAIL_NOT_FOUND"):
          message = "Bu tanımlayıcıya karşılık gelen kullanıcı kaydı yok. Kullanıcı silinmiş olabilir."
      break
      case("INVALID_PASSWORD"):
          message = "Şifre geçersiz veya kullanıcının şifresi yok."
      break
      case("INVALID_EMAIL"):
          message  = "E-posta adresi kötü biçimlendirilmiş."
      break
      case("EMAIL_EXISTS"):
          message = "E-posta adresi zaten başka bir hesap tarafından kullanılıyor."
      break
    }
    }
    return throwError(()=> message) 
  }
}


