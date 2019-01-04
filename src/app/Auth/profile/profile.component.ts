import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  FormulaireProfile: FormGroup;
  InformationText: string;
  user = firebase.auth().currentUser;

  constructor(private Builder: FormBuilder,
    private AuthService: AuthService,
    ) { }

  ngOnInit() {
    
    this.initForm();
  }

  initForm() {
    const email:string = this.user.email
    const NomPrenom:string = this.user.displayName

    this.FormulaireProfile = this.Builder.group({
      NomEtPrenom: [NomPrenom, [Validators.required, Validators.pattern("[A-Za-z ]*"), Validators.maxLength(30)]],
      mail: [email, [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
    })
  }

  onSubmit() {
    var nom = this.FormulaireProfile.get('NomEtPrenom').value;
    var email = this.FormulaireProfile.get('mail').value;
    var mdp = this.FormulaireProfile.get('password').value;


    
    this.user.updateProfile({displayName:nom,photoURL:""})
    this.user.updateEmail(email);
    this.user.updatePassword(mdp);

    this.user.reload();
    


    window.location.reload();
   
  }



  get mail() {
    return this.FormulaireProfile.get('mail');
  }

  get password() {
    return this.FormulaireProfile.get('password');
  }

  get NomEtPrenom() {
    return this.FormulaireProfile.get('NomEtPrenom');
  }
}