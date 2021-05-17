import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import {User} from '../shared/user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public afAuth: AngularFireAuth,
    public router:Router,
    public afs: AngularFirestore,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  async signinGmail(){
    var provider =  new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    return await  this.afAuth.signInWithPopup(provider)
            .then(res=>{
              console.log(" da dang nhap thanh cong")
       this.router.navigate(['admin']);
              // this.router.navigate(['home']);
      })
  }
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.router.navigate(['admin']);
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
    }
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
  async SendVerificationMail() {
    return (await this.afAuth.currentUser).sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email-address']);
    })
  }
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  
  logout(){
    return new Promise<any>((resolve,reject)=>{
      if (this.afAuth.currentUser){
      //if (this.fauth.auth.currentUser){
  
      this.afAuth.signOut();
      resolve("log out");
      }else{
      reject();
      }
  
    })
  }
}
