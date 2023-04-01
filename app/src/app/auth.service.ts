import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './models';
import { Observable, take, map} from 'rxjs';
import firebase from '@firebase/app-compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null; //current logged user

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
      this.auth.authState.subscribe((res) => {
        if (res?.uid == null) {
          this.currentUser = null;
        } else {
          this.getUser(res?.uid).subscribe((user: User | undefined) => {
              this.currentUser = user;
            });
        }
    });
  }

  //getters
  get loggedUser(): User | null {
    return JSON.parse(JSON.stringify(this.currentUser));
  }

  getUsers(): Observable<User[]> { 
    return this.db.collection<User>('users').valueChanges({ idField: 'key' }); 
  }
  
  getUser(uid: string): Observable<User | undefined> {
    return this.getUsers().pipe(
      take(1),
      map(users => users.find(x => x.uid === uid))
    );
  }

  //accounts

  register(email: string, password: string, username: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then((res) => {
        const user: User = {
          username: username,
          banned: false,
          uid: res.user!.uid,
          email: email,
          role: "User",
        };
        this.db.collection('users').add(user);
      })
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }


  //user manipulation

  updateUser(user: User, newRole: string){
    this.currentUser.role = newRole;
    this.db.collection('users').doc(user.key!).update({role : newRole})
  }

  banUser(user: User){
    this.currentUser.banned = true;
    this.db.collection('users').doc(user.key!).update({banned: true});
  }

  unbanUser(user: User){
    this.currentUser.banned = false;
    this.db.collection('users').doc(user.key!).update({banned: false});
  }

  deleteUser(user: User) {
    if (user === this.currentUser){
      this.currentUser = null;
    }
    this.db.collection('users').doc(user.key!).delete();
  }
  

  //persistence
  changePersistence(mode: string){
    if (mode == "LOCAL"){
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
     }
    if (mode === "SESSION"){
       firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
    if (mode === "NONE"){
     firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
  }
}
