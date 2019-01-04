import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Documents } from '../documents';
import { Router } from '@angular/router';
import { Upload } from '../upload';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class DocumentsService {

  firestore = firebase.firestore();
  Doc: Documents[] = [];
  OneDocuments: Documents = null;
  basePath: string = "/images"
  lastDoc: any;

  //Observable
  OneDocumentObservable = new ReplaySubject<Documents>();
  AllDocumentObservable = new ReplaySubject<Documents[]>();


  constructor(private Route: Router) {
    this.firestore.settings({
      timestampsInSnapshots: true
    });

  }


  GetDocumentOfOneUser(userID) {
    this.Doc = []
    this.firestore.collection('affichages')
      .orderBy("Date", "desc")
      .where("UserID", "==", userID)
      .get().then(
        (value) => {
          value.forEach(
            (result) => {

              var Final = result.data() as Documents;
              Final.id = result.id;

              this.Doc.push(Final)
            }
          );
          this.emitAllDocument();
        }
      );

  }
  GetDocuments(): Documents[] {

    this.Doc = [];
    this.firestore.collection('affichages').get().then(
      (value) => {
        value.forEach(
          (result) => {

            var Final = result.data() as Documents;
            Final.id = result.id;

            this.Doc.push(Final)
          }
        );
      }
    );

    return this.Doc;

  }

  GetDocumentNext() {
  }

  getDocumentById(DocID: string): Documents {

    this.firestore.collection('affichages').doc(DocID).get().then(
      (Doc) => {
        if (Doc.exists) {
          let Data = Doc.data() as Documents;
          this.OneDocuments = Data;
          this.emitDocumentID();
        }
        else {

          console.log("Documents N'existe pas !")
          this.Route.navigate(['error'])
        }
      }

    );

    return this.OneDocuments;
  }

  AddNewDocument(data) {
    this.firestore.collection('affichages').doc().set(data).then(
      () => { console.log("added !") }
    )
      .catch(
        () => { console.log("Erreur !") }
      )
  }

  onDeleteDocument(id) {

    this.firestore.collection('affichages').doc(id).get().then(

      (MyDoc) => {
        let PathImage = MyDoc.data().Image
        firebase.storage().ref().child(PathImage).delete();
        MyDoc.ref.delete();
        this.Doc.splice(this.Doc.findIndex(e => e.Image === PathImage),1);
        this.emitAllDocument();
      },
      (error) => { console.log("Erreur !", error) });

  }

  AddImage(file: Upload, data) {

    var storageRef = firebase.storage().ref();

    let uploadTask = storageRef.child(`${this.basePath}/WEB${file.name}`).put(file.file);
    uploadTask.on('state_changed',
      (snapshot: any) => {
        file.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Progress = ' + file.progress + '%');
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        this.AddNewDocument(data);
        setTimeout(
          () => { this.Route.navigate(['Affichage/All']); }, 2000
        )

      }
    );
  }

  GetDocumentsPaginator(limit: number, start) {
    this.Doc = [];
    var first = this.firestore.collection("affichages")
      .orderBy("Date", "desc")
      .limit(limit)
      .endAt(start)


    first.get().then(
      (SnapDoc) => {
        SnapDoc.forEach(element => {
          var final = element.data() as Documents
          final.id = element.id;
          this.Doc.push(final)
          this.emitAllDocument();

        });
      }
    )

  }


  // Partie Observable

  emitDocumentID() {
    this.OneDocumentObservable.next(this.OneDocuments);
  }

  emitAllDocument() {
    this.AllDocumentObservable.next(this.Doc.slice())
  }




}


