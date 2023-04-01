import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage: string;
  constructor(
    public authService: AuthService,
    private router: Router) { }

  onSignUp(email: string, password: string, username: string): void {
    if (username == ''){
      this.errorMessage = 'Podaj imie i nazwisko!'
    }
    else{
      this.authService.register(email, password, username).then(e => {
        this.errorMessage = ''
        this.router.navigateByUrl('');
      }).catch(e => {this.errorMessage = e.message});
    }
  }

}
