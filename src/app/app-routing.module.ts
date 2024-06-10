import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnaSayfaComponent } from './ana-sayfa/ana-sayfa.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './auth.guard';
import { ProfilKayitComponent } from './profil-kayit/profil-kayit.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/ana-sayfa', pathMatch: 'full' },
  { path: 'ana-sayfa', component: AnaSayfaComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'profil-kayit', component: ProfilKayitComponent, },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
  { path: 'cart', component: CartComponent },
  { path: 'payment', component: PaymentFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
