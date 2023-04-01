import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  persistence: string;
  persistences: string[] = ["LOCAL", "SESSION", "NONE"];
  users: User[] = [];
  constructor(public authService: AuthService) {
    this.getUsers();
  }

  changePersistence(p){
    this.authService.changePersistence(p);
    console.log(p);
  }


  getUsers(): void {
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  ban(user: User){
    this.authService.banUser(user);
    console.log("Zbanowano " + user.username);
  }

  unban(user: User){
    this.authService.unbanUser(user);
    console.log("Odbanowano " + user.username);
  }

  setRole(user: User, role: string){
    this.authService.updateUser(user, role);
  }
}
