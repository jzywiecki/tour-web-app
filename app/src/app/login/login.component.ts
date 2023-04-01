import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  errorMessage: string = '';
  constructor(
    public authService: AuthService,
    private router: Router) { }

  onSignIn(email:string, password:string): void {
    this.authService.login(email, password).then(e => {
        this.errorMessage = ''
        this.router.navigateByUrl('');
      }).catch(e => {this.errorMessage = e.message});
  }
}
