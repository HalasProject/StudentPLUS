import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConnexionComponent } from './Auth/connexion/connexion.component';
import { InscriptionComponent } from './Auth/inscription/inscription.component';
import { AllComponent } from './Documents/all/all.component';
import { OneComponent } from './Documents/one/one.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddComponent } from './Documents/add/add.component';
import { CanAuthService } from './service/can-auth.service';
import { ProfileComponent } from './Auth/profile/profile.component';
import { ResearchComponent } from './research/research.component';
import { MyDocComponent } from './Auth/my-doc/my-doc.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'Connexion', component: ConnexionComponent },
  { path: 'Search', component: ResearchComponent },
  { path: 'Me/MyAffichage', canActivate:[CanAuthService],component:MyDocComponent},
  { path: 'Me/Profile', canActivate: [CanAuthService], component: ProfileComponent },
  { path: 'Inscription', component: InscriptionComponent },
  { path: 'Affichage/All', component: AllComponent },
  { path: 'Affichage/Add', canActivate: [CanAuthService], component: AddComponent },
  { path: 'Affichage/:id', component: OneComponent },
  
  { path: '', component: HomeComponent },
  { path: 'error', component: NotFoundComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
