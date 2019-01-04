import { Component, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery'

import { Documents } from '../documents';

import { SearchService } from '../service/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit, OnDestroy {

  constructor(private DocSearch: SearchService) { }

  LicenceList = '#LicenceList';
  MasterList = '#MasterList';
  LiceceEtMaster = "#MasterLicence";
  ListOfDocuments: Documents[] = [];
  RxJSDocSecurity: Subscription;
  path: any;

  example: string[] = ["Moyennes", "Analyse Note", "Groupe:3", "Section:1", "Affichage Compilation", "Algebre", "TIC", "ASD", "Groupe:2", "Section:2"]





  ngOnInit() {
    Math.random()

    this.RxJSDocSecurity = this.DocSearch.ListeOfDocumentsRxJS.subscribe(
      (DocList: Documents[]) => {

        this.ListOfDocuments = DocList;
        $("#ImageLoading").remove();
        $("#tableauR").show();
      }
    )

  }

  getExample() {

    let K = this.example[1]

    return K;


  }

  ngOnDestroy() {
    this.RxJSDocSecurity.unsubscribe();
  }

  DataChanged(event, eventtext) {
    if (event === "Groupe" || event === "Section") {
      eventtext = parseInt(eventtext, 10)
    }

    this.DocSearch.SearchByRef(event, eventtext, this.path)
  }

  SearchOption(path: string) {
    console.log(path)
    this.path = path;
    this.ListOfDocuments = []
    this.DocSearch.SearchDoc(path);
    $("#debut").hide()
    $("#PanelSearch").show()
  }


  showLicense() {

    $(this.LiceceEtMaster).hide();
    $(this.LicenceList).show()

  }

  showMaster() {
    $(this.LiceceEtMaster).hide();
    $(this.MasterList).show()
  }

  RetourList() {
    $(this.LicenceList).hide();
    $(this.MasterList).hide();
    $(this.LiceceEtMaster).show();
  }
}
