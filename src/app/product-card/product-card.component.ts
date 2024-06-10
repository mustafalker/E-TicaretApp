import { Component, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService,private toastr: ToastrService) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastr.success('Ürün başarıyla sepete eklendi!', 'Başarılı');
  }
}
