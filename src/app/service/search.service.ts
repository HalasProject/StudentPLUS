import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Documents } from '../documents';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  firestore = firebase.firestore();
  

  constructor() {
       var settings = { timestampsInSnapshots: true};
      this.firestore.settings(settings);
   }

  ListOfDocuments: Documents[] = [];
  ListeOfDocumentsRxJS = new ReplaySubject<Documents[]>();

  SearchDoc(path: string) {

    this.ListOfDocuments = [];
    this.firestore.collection('affichages')
      .orderBy("Date","desc")
      .where('Year', '==', path)
      .get()
      .then(
        (Doc) => {
          Doc.forEach(element => {
            let OneDocument = element.data() as Documents;
            OneDocument.id =  element.id
            this.ListOfDocuments.push(OneDocument);
          });
        }
      )

    this.emitSearchDoc()

  }

  SearchByRef(choix:string,text,year:string){
    this.ListOfDocuments = [];
    this.firestore.collection('affichages')
      .orderBy("Date","desc")
      .where(choix, '==', text)
      .where("Year", '==', year)
      .get()
      .then(
        (Doc) => {
          Doc.forEach(element => {
            let OneDocument = element.data() as Documents;
            OneDocument.id =  element.id
            this.ListOfDocuments.push(OneDocument);
          });
        }
      )

    this.emitSearchDoc()

  }


  emitSearchDoc() {
    this.ListeOfDocumentsRxJS.next(this.ListOfDocuments);
  }

}
