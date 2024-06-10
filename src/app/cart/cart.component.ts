import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService, private router: Router , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  addToCart(product: Product) {
    const existingItem = this.cart.find(item => item.product.productId === product.productId);
    if (existingItem) {
      existingItem.quantity++;
      this.toastr.info(`${product.productName} adedi artırıldı`, 'Sepet Güncellendi');
    } else {
      this.cart.push({ product, quantity: 1 });
      this.toastr.success(`${product.productName} sepete eklendi`, 'Başarılı');
    }
  }

  removeFromCart(product: Product) {
    const index = this.cart.findIndex(item => item.product.productId === product.productId);
    if (index !== -1) {
      this.cart[index].quantity--;
      if (this.cart[index].quantity === 0) {
        this.cart.splice(index, 1);
        this.toastr.warning(`${product.productName} sepetten çıkarıldı`, 'Sepet Güncellendi');
      } else {
        this.toastr.info(`${product.productName} adedi azaltıldı`, 'Sepet Güncellendi');
      }
    }
  }

  removeCompletelyFromCart(product: Product) {
    const index = this.cart.findIndex(item => item.product.productId === product.productId);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.toastr.warning(`${product.productName} sepetten tamamen çıkarıldı`, 'Sepet Güncellendi');
    }
  }

  checkout() {
    if (this.cart.length > 0) {
      this.toastr.success('Ödemeniz başarıyla tamamlandı', 'Başarılı');
      this.cart = []; // Empty the cart
    } else {
      this.toastr.warning('Sepetiniz boş', 'Uyarı');
    }
  }
}
