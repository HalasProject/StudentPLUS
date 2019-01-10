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
      //Put here your firebase database config 
    };
    firebase.initializeApp(config);
   
    
  
  }
}
