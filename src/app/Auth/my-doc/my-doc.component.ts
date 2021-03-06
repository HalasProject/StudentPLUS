import { Component, OnInit } from '@angular/core';
import { Documents } from 'src/app/documents';
import { DocumentsService } from 'src/app/service/documents.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-my-doc',
  templateUrl: './my-doc.component.html',
  styleUrls: ['./my-doc.component.css']
})
export class MyDocComponent implements OnInit {

  Documents: Documents[] = [];
  UserID: string = "NULL";
  DocumentID: string

  constructor(private DocumentService: DocumentsService,
    private AuthService: AuthService) {
    this.UserID = this.AuthService.getUserId()
   
  }


  ngOnInit() {
    
    this.DocumentService.GetDocumentOfOneUser(this.UserID).then(
      ()=>{ this.DocumentService.AllDocumentsOfUser$.subscribe(
        (value) => {
          this.Documents = value;
        })}
    )

      if (this.Documents = []){
        $("#errornothing").show();
      }


  }

  onDelete(id: string) {

    //JQ("#exampleModal").modal('hide')
    this.DocumentService.onDeleteDocument(id);
   

  }

  GetLength():boolean{
    if (this.Documents.length === 0)
    return true;
    else
    return false;
  }


}
