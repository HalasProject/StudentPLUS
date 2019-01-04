import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './Auth/connexion/connexion.component';
import { InscriptionComponent } from './Auth/inscription/inscription.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AllComponent } from './Documents/all/all.component';
import { OneComponent } from './Documents/one/one.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './Documents/add/add.component';
import { ProfileComponent } from './Auth/profile/profile.component';
import { AuthService } from './service/auth.service';
import { CanAuthService } from './service/can-auth.service';
import { DocumentsService } from './service/documents.service';
import { EditComponent } from './Documents/edit/edit.component';
import { ResearchComponent } from './research/research.component';
import { MyDocComponent } from './Auth/my-doc/my-doc.component';



@NgModule({
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    AllComponent,
    OneComponent,
    NotFoundComponent,
    AddComponent,
    ProfileComponent,
    EditComponent,
    ResearchComponent,
    MyDocComponent,
    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService,CanAuthService,DocumentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
