import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import * as firebase from 'firebase';
import { Documents } from 'src/app/documents';
import { DocumentsService } from 'src/app/service/documents.service';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Router, Event } from '@angular/router';
import { Upload } from 'src/app/upload';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  FormulaireAdd: FormGroup;


  License1_1 = ["","Analyse 1", "Algebre 1", "Initiation à l'algorithmique", "Terminologie Francais", "Bureautique", "Physique 1", "Codage", "Economie", "Electronique", "Langue étrangère 1"];
  License1_2 = ["","Analyse 2", "Algebre 2", "Probabillités & Statistique", "Structure Machine", "TIC", "Mathémathique Programation", "Orientée Objet", "Physique 2", "Histoire des sciences"];

  License2_1 = ["","Archetecture des Ordinateurs", "Algorithme et structures de données", "Logique Mathématique", "Programation Orientée Objet", "System d'information", "Théorie des langages", "Méthodes numériques", "Langue étrangère 2"];
  License2_2 = ["","Base de Données", "Systèmes d'exploitation 1", "Génie Logiciel 1", "Théorie des graphs", "Réseaux de communication", "Dévloppement d'application Web", "Aspects Juridiques et Economiques des Logiciels", "Langue étrangère 3"];

  License3_1 = ["","Interface Homme Machine", "Compilation", "System d'exploitation", "Prolog", "Genie Logiciel", "Réseaux de communication 2", "Nouvelles Technologies Dev Application"];
  License3_2 = ["",'Android'];

  Master1_1 = ["",''];
  Master1_2 = ["",''];

  Master2_1 = ["",''];
  Master2_2 = ["",''];

  InformationText: string;
  MonAffichageImage: File = null;
  public Uploader: Upload;
  TimeToUpload: boolean = false;

  test: number = 50;
  disableButton: boolean = false;

  constructor(private Builder: FormBuilder,
    private DocService: DocumentsService,
    private Router: Router) { }



  onChange(event) {
    if (event.target.files[0]){
      $("#btnPublier").show();
      this.MonAffichageImage = event.target.files[0];
    }
    else{
      $("#btnPublier").hide();
    }
  }

  ngOnInit() {
    this.TimeToUpload = false;
    this.initForm();
  }

  initForm() {

    this.FormulaireAdd = this.Builder.group(
      {
        Titre: ['', [Validators.required, Validators.maxLength(30)]],
        Year: ['', [Validators.required]],
        Semestre: ['', [Validators.required]],
        Module: ['None'],
        Section: ['', [Validators.required, Validators.min(1),Validators.max(10)]],
        Groupe: ['', [Validators.required, Validators.min(1),Validators.max(10)]],
        Type: ['', [Validators.required]],
        Remarque: ['', [Validators.maxLength(150)]],

      }
    )
  }

  onSubmit() {
    this.TimeToUpload = true;
  }

  onSubmitGloabal() {
    this.disableButton = true;

    var Bonus = {
     
      CreatorName: firebase.auth().currentUser.displayName,
      Image: `images/WEB${this.MonAffichageImage.name}`,
      Date: new Date(),
      UserID: firebase.auth().currentUser.uid,
    }
    var DocAdding = this.FormulaireAdd.value as Object
    var ObjectFinal = Object.assign(Bonus, DocAdding)

    this.Uploader = new Upload(this.MonAffichageImage, this.MonAffichageImage.name)
    this.DocService.AddImage(this.Uploader, ObjectFinal)

  }

  ModuleCalculator(): string[] {
    let Niveau = this.Year.value;
    let Semestre = this.Semestre.value;

    switch (Niveau) {
      case "Licence 1":
        {
          if (Semestre === 'S1') return this.License1_1
          else return this.License1_2
        }

      case "Licence 2":
        {
          if (Semestre === 'S1') return this.License2_1
          else return this.License2_2
        }

      case "Licence 3":
        {
          if (Semestre === 'S1') return this.License3_1
          else return this.License3_2
        }

      case "Master 1":
        {
          if (Semestre === 'S1') return this.Master1_1
          else return this.Master1_2
        }

      case "Master 2":
        {
          if (Semestre === 'S1') return this.Master2_1
          else return this.Master2_2
        }

      default: return this.License1_1

    }
  }


  get Titre() {
    return this.FormulaireAdd.get('Titre');
  }

  get Year() {
    return this.FormulaireAdd.get('Year');
  }

  get Semestre() {
    return this.FormulaireAdd.get('Semestre');
  }

  get Module() {
    return this.FormulaireAdd.get('Module');
  }

  get Section() {
    return this.FormulaireAdd.get('Section');
  }

  get Groupe() {
    return this.FormulaireAdd.get('Groupe');
  }

  get Type() {
    return this.FormulaireAdd.get('Type');
  }

  get Remarque() {
    return this.FormulaireAdd.get('Remarque');
  }

}
