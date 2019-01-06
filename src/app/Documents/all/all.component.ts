import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsService } from 'src/app/service/documents.service';
import * as firebase from 'firebase';
import { Documents } from 'src/app/documents'
import { AuthService } from 'src/app/service/auth.service';
import * as JQ from 'jquery'
import { Timestamp, Subscription } from 'rxjs';




@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit, OnDestroy {


  Documents: Documents[] = [];
  Documents$: Subscription;

  UserID: string = "NULL";
  DocumentID: string;
  
  StartNumber: number = 1;
  

  constructor(private DocumentService: DocumentsService) {
    this.DocumentService.GetDocumentsPaginator(8, this.StartNumber);
  }


  ngOnInit() {

    this.Documents$ = this.DocumentService.AllDocuments$.subscribe(
      (value) => {
        this.Documents = value;
      }
    )

  $("cardeyes").mouseenter(
    ()=>{ console.log("lol")}
  )
    

  }

  onDelete(id: string) {
    this.DocumentService.onDeleteDocument(id);
  }


  onNext() {
    //Manque le nombre maximum 
    this.StartNumber += 4
    this.DocumentService.GetDocumentsPaginator(8, this.StartNumber);
  }

  onPrevious() {
    this.StartNumber -= 4
    this.DocumentService.GetDocumentsPaginator(8, this.StartNumber);

  }

  GetNumber(): boolean {
    if (this.StartNumber <= 1)
      return true;
  }

  GetLength(): boolean {
    if (this.Documents.length === 0)
      return true;
    else
      return false;
  }

  ngOnDestroy() {
    this.Documents$.unsubscribe();
  }

}