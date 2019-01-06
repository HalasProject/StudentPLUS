import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import { Documents } from '../documents';
import { ReplaySubject } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {


  COLLECTION_NAME: string;
  ORDERED_BY: firebase.firestore.OrderByDirection;
  ORDERED_NAME: string;
  FireStore: firebase.firestore.Firestore;


  ListOfDocuments: Documents[] = [];
  ListOfDocuments$ = new ReplaySubject<Documents[]>();

  constructor(private Config: ConfigService) {
    this.ORDERED_NAME = this.Config.ORDERED_NAME;
    this.ORDERED_BY = this.Config.ORDERED_BY;
    this.FireStore = this.Config.firestore
    this.COLLECTION_NAME = this.Config.COLLECTION_NAME;
  }

  SearchDoc(option: string) {

    this.ListOfDocuments = [];
    this.FireStore.collection(this.COLLECTION_NAME)
      .orderBy(this.ORDERED_NAME, this.ORDERED_BY)
      .where('Year', '==', option)
      .get()
      .then(
        (Documents) => {
          Documents.forEach(Doc => {
            let OneDocument = Doc.data() as Documents;
            OneDocument.id = Doc.id
            this.ListOfDocuments.push(OneDocument);
          });
        }
      )

    this.emitSearchDoc()

  }

  SearchByRef(choix: string, text, year: string) {
    this.ListOfDocuments = [];
    this.FireStore.collection(this.COLLECTION_NAME)
      .orderBy(this.ORDERED_NAME, this.ORDERED_BY)
      .where(choix, '==', text)
      .where("Year", '==', year)
      .get()
      .then(
        (Documents) => {
          Documents.forEach(Doc => {
            let OneDocument = Doc.data() as Documents;
            OneDocument.id = Doc.id
            this.ListOfDocuments.push(OneDocument);
          });
        }
      )

    this.emitSearchDoc()

  }

  emitSearchDoc() {
    this.ListOfDocuments$.next(this.ListOfDocuments);
  }

}
