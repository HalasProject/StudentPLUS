import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsService } from 'src/app/service/documents.service';
import { ActivatedRoute } from '@angular/router';
import { Documents } from 'src/app/documents';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit, OnDestroy {


  CurrentDoc: Documents = null;
  CurrentDoc$: Subscription;

  DocumentID: string
  IMAGE_URL: any = "#";
  UserID: string = "null";

  constructor(public DocumentService: DocumentsService,
    private AuthService: AuthService,
    private Route: ActivatedRoute) {
    this.DocumentID = this.Route.snapshot.params['id'];
  }

  ngOnInit() {
    firebase.auth()
      .onAuthStateChanged(
        (user) => {
          if (user) {
            this.UserID = this.AuthService.getUserId()
            console.log(this.UserID)
          }
          else {
            console.log("PAS CONNECTER")
          }
        }
      )

    this.DocumentService.getDocumentById(this.DocumentID).then(
      ()=>{this.CurrentDoc$ = this.DocumentService.OneDocument$.subscribe(
        (Doc) => {
  
          this.CurrentDoc = Doc;
          var ImageURL = `${this.CurrentDoc.Image}`;
  
          firebase.storage().ref().child(ImageURL)
            .getDownloadURL()
            .then(
              (url) => {
                var image = document.getElementById('myimg') as HTMLImageElement
                this.IMAGE_URL = url
                image.src = url;
              },
              (error) => {
                console.log('Problem with image !? :' + error)
              });
        }, (error) => { console.log('erreur !' + error) }
      )}
    )
    .catch(
      
     ()=> (console.log("erreur"))
    )

  }

  openImage() {
    window.open(this.IMAGE_URL)
  }

  onDelete() {
    this.DocumentService.onDeleteDocument(this.DocumentID)
  }

  ngOnDestroy() {
    this.CurrentDoc$.unsubscribe();
    
  }

}
