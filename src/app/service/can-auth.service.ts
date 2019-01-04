import { Injectable } from '@angular/core';

import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CanAuthService implements CanActivate {

  constructor(private route: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {

    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true)
          
            }
            else {
              this.route.navigate(['/Connexion']);
              reject(true)
            }
          }
        );
      }
    );
  }


}
