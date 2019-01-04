import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private Builder: FormBuilder,
              private AuthService:AuthService,
              private route:Router) { }

  Formulaire: FormGroup;
  InformationText:string

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.Formulaire = this.Builder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  onSubmit() {
    var email = this.Formulaire.get('mail').value;
    var mdp = this.Formulaire.get('password').value;

    this.AuthService.onConnect(email,mdp).then(
      (value)=> { 
        setTimeout(()=>{this.route.navigate(['Affichage/All'])},1000)
        this.InformationText = "Successfully connected !" },
        
      (error)=> { this.InformationText = error}
    );

  }

  get mail() {
    return this.Formulaire.get('mail');
  }

  get password() {
    return this.Formulaire.get('password');
  }

}
