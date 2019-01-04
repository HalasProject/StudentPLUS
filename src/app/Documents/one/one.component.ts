import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsService } from 'src/app/service/documents.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Documents } from 'src/app/documents';
import { Subject, ReplaySubject, Subscription } from 'rxjs';
import * as firebase from 'firebase';
import { DomSanitizer } from '@angular/platform-browser';
import { $ } from 'protractor';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit,OnDestroy {


  
  DocRxJS:Subscription;
  
  CurrentDoc:Documents = null;

  Image:TexImageSource;
 
 
  idDoc: string
  storageRef:any = "";
  UserID:string = "null";

  


  constructor(public DocumentService: DocumentsService,
    private AuthService:AuthService,
    private Route: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) { 

      this.idDoc = this.Route.snapshot.params['id'];
     
  
  }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (user)=>
      {
        if(user){
          this.UserID = this.AuthService.getUserId()
          console.log(this.UserID)
        }
        else
        {
          console.log("PAS CONNECTER")
        }
      }
    )
     
     
    
    
    this.DocumentService.getDocumentById(this.idDoc);

    this.DocRxJS = this.DocumentService.OneDocumentObservable.subscribe(
      (value)=> { 
        
        this.CurrentDoc = value;
        var path = `${this.CurrentDoc.Image}`;
        console.log(this.CurrentDoc.Image)
      
        firebase.storage().ref().child(path)
        .getDownloadURL()
        .then(
          (url)=> {
      
          var image = document.getElementById('myimg') as HTMLImageElement

          this.storageRef = url
          image.src = url;
        },(error) =>{
          console.log('Problem with image !? :'+error)
        }); 
       
      
      
      },(error) => { console.log('erreur !'+error)}
    )
     




  }

  openImage(){
    window.open(this.storageRef)
  }


  onDelete(id:string){
    this.DocumentService.onDeleteDocument(id)
  }

  ngOnDestroy(){
    this.DocRxJS.unsubscribe();
  }



}
