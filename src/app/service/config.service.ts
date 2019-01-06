import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class ConfigService {


  firestore = firebase.firestore();

  /** EDIT THIS VARIABLE TO CONFIG UR FireBase DB */
  //********************************************* */

  //Collection Name
  COLLECTION_NAME = "affichages"
  //Folder In FireStorage
  PATH_NAME = "/images"
  //Your Collection is Order By ?
  ORDERED_NAME = 'Date'
  //Order Direction of Collection
  ORDERED_BY: firebase.firestore.OrderByDirection = 'desc' // desc or asc 

  //********************************************* */

  constructor() {
    var settings = { timestampsInSnapshots: true };
    this.firestore.settings(settings);
  }


}
