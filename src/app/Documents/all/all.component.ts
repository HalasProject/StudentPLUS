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
export class AllComponent implements OnInit,OnDestroy {

 
  Documents: Documents[] = [];
  UserID:string = "NULL";
  DocumentID:string
  StartNumber:number = 1;
  RxJSDocument :Subscription;

  constructor(private DocumentService: DocumentsService,
              private AuthService:AuthService) {

                this.DocumentService.GetDocumentsPaginator(8,this.StartNumber);
               
               
               

  }

  
  ngOnInit() {
  

    this.RxJSDocument = this.DocumentService.AllDocumentObservable.subscribe(
      (value)=> {
        this.Documents = value;
       
      }
    )

    console.log(this.Documents.length)

    

     
     
    
  }

  onDelete(id:string){
   
    //JQ("#exampleModal").modal('hide')
    this.DocumentService.onDeleteDocument(id);
    this.ngOnInit();

  }

  
  onNext(){
   //Manque le nombre maximum 
    this.StartNumber += 4
    this.DocumentService.GetDocumentsPaginator(8,this.StartNumber);
  }

  onPrevious(){
    this.StartNumber -= 4
    this.DocumentService.GetDocumentsPaginator(8,this.StartNumber);

  }

  GetNumber():boolean{
    if (this.StartNumber <= 1)
    return true;
  }

  ngOnDestroy(){
   
    this.RxJSDocument.remove;
    
  }

  GetLength():boolean{
    if (this.Documents.length === 0)
    return true;
    else
    return false;
  }

}