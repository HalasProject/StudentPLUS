import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsService } from 'src/app/service/documents.service';
import * as firebase from 'firebase';
import { Documents } from 'src/app/documents'
import { AuthService } from 'src/app/service/auth.service';
import * as JQ from 'jquery'
import { Timestamp, Subscription } from 'rxjs';
import { promise } from 'protractor';




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

  

  constructor(private DocumentService: DocumentsService) {
    
  }


  ngOnInit() {
   
    console.log(this.Documents.length)
    this.DocumentService.GetDocuments().then(
      ()=>{
      this.Documents$ = this.DocumentService.AllDocuments$.subscribe(
        (value) => {
          this.Documents = value;
        }
      )}
    )
    

  }

  onDelete(id: string) {
    this.DocumentService.onDeleteDocument(id);
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