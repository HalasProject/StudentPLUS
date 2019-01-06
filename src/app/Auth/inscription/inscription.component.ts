import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['../ExtendsCSS.component.css']
})
export class InscriptionComponent implements OnInit {

  FormulaireInscription: FormGroup;
  InformationText: string;

  constructor(private Builder: FormBuilder,
    private AuthService: AuthService,
    private route: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.FormulaireInscription = this.Builder.group({
      nom: ['', [Validators.required, Validators.pattern("[A-Za-z ]*"), Validators.maxLength(15)]],
      prenom: ['', [Validators.required, Validators.pattern("[A-Za-z ]*"), Validators.maxLength(15)]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
    })
  }

  onSubmit() {
    var nom = this.FormulaireInscription.get('nom').value;
    var prenom = this.FormulaireInscription.get('prenom').value;
    var email = this.FormulaireInscription.get('mail').value;
    var mdp = this.FormulaireInscription.get('password').value;


    this.AuthService.onInscription(email, mdp, nom, prenom).then(
      () => { 
        this.InformationText = "Successfully Registered !" 
        setTimeout(()=>{
          window.location.reload();
          this.route.navigate(['Affichage/All'])},1000) 
        
       

         },
      (error) => { this.InformationText = error }
    );
  }

  get mail() {
    return this.FormulaireInscription.get('mail');
  }

  get password() {
    return this.FormulaireInscription.get('password');
  }

  get nom() {
    return this.FormulaireInscription.get('nom');
  }

  get prenom() {
    return this.FormulaireInscription.get('prenom');
  }

}
