import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Documents } from '../documents';
import { Router } from '@angular/router';
import { Upload } from '../upload';
import { ReplaySubject } from 'rxjs';
import { ConfigService } from './config.service';



@Injectable({
  providedIn: 'root'
})

export class DocumentsService {


  FireStore: firebase.firestore.Firestore;
  storageRef = firebase.storage().ref();

  COLLECTION_NAME: string;
  ORDERED_NAME: string;
  ORDERED_BY: firebase.firestore.OrderByDirection;

  PATH_NAME: string;

  
  OneDocument: Documents = null;
  OneDocument$ = new ReplaySubject<Documents>();

  AllDocuments: Documents[] = [];
  AllDocuments$ = new ReplaySubject<Documents[]>();

  AllDocumentsOfUser:Documents[] = [];
  AllDocumentsOfUser$ = new ReplaySubject<Documents[]>();

  constructor(private Route: Router,
    private Config: ConfigService) {

    this.PATH_NAME = this.Config.PATH_NAME;
    this.ORDERED_NAME = this.Config.ORDERED_NAME;
    this.ORDERED_BY = this.Config.ORDERED_BY;
    this.FireStore = this.Config.firestore
    this.COLLECTION_NAME = this.Config.COLLECTION_NAME;
  }


  GetDocumentOfOneUser(userID: string) {
    
    return new Promise(
      (resolve,reject)=>{
        this.AllDocumentsOfUser = []
        this.FireStore.collection(this.COLLECTION_NAME)
          .orderBy(this.ORDERED_NAME, this.ORDERED_BY)
          .where("UserID", "==", userID)
          .get()
          .then(
            (value) => {
              value.forEach(
                (result) => {
    
                  var Final = result.data() as Documents;
                  Final.id = result.id;
    
                  this.AllDocumentsOfUser.push(Final)
                }
              );
              this.emitAllDocumentsOfUser();
              resolve();
            }
          );
      }
    )
    
   

  }

  GetDocuments(){
  return new Promise(
    (resolve,reject)=>{
      this.AllDocuments = [];
      var first = this.FireStore.collection(this.COLLECTION_NAME)
        .orderBy(this.ORDERED_NAME, this.ORDERED_BY)
        
      first.get().then(
        (Documents) => {
          Documents.forEach(Doc => {
            var OneDocument = Doc.data() as Documents;
            OneDocument.id = Doc.id;
            this.AllDocuments.push(OneDocument)
            
          });
          this.emitAllDocument();
          resolve();
        }
      ).catch(
        (error)=> { reject(error) });
    }
  );


    
    

  }

  getDocumentById(DocID: string) {
   return new Promise(
     (resolve,reject)=>{
      this.FireStore.collection(this.COLLECTION_NAME)
      .doc(DocID)
      .get()
      .then(
        (Doc) => {
          if (Doc.exists) {
            let OneDoc = Doc.data() as Documents;
            this.OneDocument = OneDoc;
            this.emitDocumentID();
           
          }
          else {
            this.Route.navigate(['error'])
          }
        }
       
      )
      resolve()
     }
   )
  }

  AddNewDocument(DocumentInformation) {
    this.FireStore.collection(this.COLLECTION_NAME)
      .doc()
      .set(DocumentInformation)
      .then(
        () => { console.log("Document Added Succefuly !") }
      )
      .catch(
        () => { console.log("Error To Add This New Document !") }
      )
  }

  onDeleteDocument(DocumentID: string) {

    this.FireStore.collection(this.COLLECTION_NAME)
      .doc(DocumentID)
      .get()
      .then(
        (MyDoc) => {

          let Doc_Image_URL = MyDoc.data().Image
          firebase.storage().ref().child(Doc_Image_URL).delete(); // Delete Image of the document in FireStorage
          MyDoc.ref.delete(); // Then Delete the document in FireStore

          this.AllDocuments.splice(this.AllDocuments.findIndex(e => e.Image === Doc_Image_URL), 1);
          this.emitAllDocument();
          this.Route.navigate(['Affichage/All']);
        },
        (error) => { console.log("Erreur !", error) });

  }

  AddImage(file: Upload, DocumentInformation) {

    this.storageRef
      .child(`${this.PATH_NAME}/WEB${file.name}`)
      .put(file.file)
      .on('state_changed',
        (snapshot: any) => {
          file.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Progress = ' + file.progress + '%');
        },
        (error) => {
          // Upload Failed !
          console.log(error)
        },
        () => {
          // Upload Complete !
          this.AddNewDocument(DocumentInformation);
          setTimeout(
            () => { this.Route.navigate(['Affichage/All']); }, 2000
          )

        }
      );
  }

  // Partie Observable

  emitDocumentID() {
    this.OneDocument$.next(this.OneDocument);
  }

  emitAllDocument() {
    this.AllDocuments$.next(this.AllDocuments.slice())
  }

  emitAllDocumentsOfUser() {
    this.AllDocumentsOfUser$.next(this.AllDocumentsOfUser.slice())
  }

}


