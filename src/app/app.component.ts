import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Subject, Subscribable, Subscription } from 'rxjs';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  

  
  title = 'AngularFireBase';

  constructor(){
    var config = {
      apiKey: "AIzaSyA2_gEMFKrlYyn6xfo6mxNVutQDBx8rPIA",
      authDomain: "affichage-note.firebaseapp.com",
      databaseURL: "https://affichage-note.firebaseio.com",
      projectId: "affichage-note",
      storageBucket: "affichage-note.appspot.com",
      messagingSenderId: "164890982427"
    };
    firebase.initializeApp(config);
   
    
  
  }
}
