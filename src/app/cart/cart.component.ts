import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../model/product';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService, private router: Router, private toastr: ToastrService,
    private sanitizer : DomSanitizer
  ) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastr.info(`${product.productName} adedi artırıldı`, 'Sepet Güncellendi');
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
    this.toastr.warning(`${product.productName} adedi azaltıldı`, 'Sepet Güncellendi');
  }

  removeCompletelyFromCart(product: Product) {
    this.cartService.removeCompletelyFromCart(product);
    this.toastr.warning(`${product.productName} sepetten tamamen çıkarıldı`, 'Sepet Güncellendi');
  }

  checkout() {
    if (this.cart.length > 0) {
      // Implement the logic to process payment here, e.g., navigating to payment page
      this.router.navigate(['/payment']);
    } else {
      this.toastr.warning('Sepetiniz boş', 'Uyarı');
    }
  }
}
