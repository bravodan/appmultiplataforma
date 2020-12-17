import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.auth.UserCredential;

  constructor(public afAuth: AngularFireAuth) { }

  public register(email:string, contrasena:string){
    return new Promise((resolve,reject) => {
      this.afAuth.createUserWithEmailAndPassword(email,contrasena).then(user=>{
        this.user = user;
        resolve(user);
      }).catch(error=>reject(error));
    });
  }

  public login(email:string, contrasena:string){
    return new Promise((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, contrasena).then(user => {
        this.user = user;
        resolve(user);
      }).catch(error=>reject(error));
    });
  }

  public getCurrentUser(){
    return this.afAuth.currentUser;
  }

  public logout(){
    return this.afAuth.signOut();
  }

  public getUser(){
    return this.user;
  }

  public setUser(user: firebase.auth.UserCredential){
    this.user = user;
  }
}
