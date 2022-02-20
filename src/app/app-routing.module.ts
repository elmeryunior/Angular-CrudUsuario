import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { LoginoutComponent } from './Login/loginout/loginout.component';
import { AddComponent } from './Persona/add/add.component';
import { EditComponent } from './Persona/edit/edit.component';
import { ListarComponent } from './Persona/listar/listar.component';
import { AuthGaurdService } from './Service/auth-gaurd.service';

const routes: Routes = [
  {path:'listar',component:ListarComponent,canActivate:[AuthGaurdService]},
  {path:'add',component:AddComponent,canActivate:[AuthGaurdService]},
  {path:'edit',component:EditComponent,canActivate:[AuthGaurdService]},
  {path:'login',component:LoginComponent},
  {path:'loginout',component:LoginoutComponent,canActivate:[AuthGaurdService]}
];

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule{}
