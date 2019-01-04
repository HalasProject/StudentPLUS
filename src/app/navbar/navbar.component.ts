import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../service/auth.service';
import * as jQuery from 'jquery';

declare var $:any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 
  isAuth:boolean;
  constructor(private AuthService:AuthService) { }
  UserName:string;
  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user)=>{
        if (user){
           this.isAuth = true
                    this.UserName = user.displayName}
        else { this.isAuth = false}
      }
      
    )
  }

  onDeconnexion(){
   $('#DeconnexionModel').modal('toggle')
    this.AuthService.onDeconnect();
    
  }
}
