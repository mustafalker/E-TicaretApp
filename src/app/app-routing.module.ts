import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ProfilKayitComponent } from './profil-kayit/profil-kayit.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: '', redirectTo: '/ana-sayfa', pathMatch: 'full' },
  { path: 'ana-sayfa', component: AnaSayfaComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'to-do-list', component: ToDoListComponent},
  { path: 'profil-kayit', component: ProfilKayitComponent,},
  { path: 'products', component: ProductComponent,},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
