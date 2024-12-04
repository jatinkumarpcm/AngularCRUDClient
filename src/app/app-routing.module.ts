import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ContactComponent } from './contact/contact.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [

  { path: '', redirectTo: 'contact', pathMatch: 'full' }, 
  {
    path: 'contact', component: ContactComponent
  },
    {
    path: 'add', component: AddComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
