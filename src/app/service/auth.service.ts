import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ReplaySubject, Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = new ReplaySubject<boolean>();
  constructor(private Router: Router) { }


  UserConnctedOrNot() {
    firebase.auth()
      .onAuthStateChanged(
        (user) => {
          if (user) { return true }
          else return false
        }
      )
  }



  onConnect(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.isAuth.next(true);
            resolve()
          },
          (error) => { reject(error) }
        );
      }
    );

  }

  onInscription(email: string, password: string, nom: string, prenom: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            const profile = {
              displayName: nom + " " + prenom,
              photoURL: ""
            }
            firebase.auth().currentUser.updateProfile(profile)
            firebase.app().auth()
            resolve()
          },
          (error) => { reject(error) }
        );
      }
    );

  }

  onDeconnect() {
    firebase.auth().signOut();
    this.Router.navigate(['home'])
  }

  getUserId() {

    return firebase.auth().currentUser.uid;

  }

  IsConnected():any {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth.next(true)
          return true;
        }
        else {
          this.isAuth.next(false)
          return false;
        }
      }
    )
  }
}