import { Injectable } from '@angular/core';
import { Product } from '../model/product';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private cart: { product: Product, quantity: number }[] = [];
  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
  }
  getCart(): { product: Product, quantity: number }[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    const item = this.cart.find(i => i.product.productId === product.productId);
    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  }

  removeFromCart(product: Product): void {
    const item = this.cart.find(i => i.product.productId === product.productId);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      this.cart = this.cart.filter(i => i.product.productId !== product.productId);
    }
  }

  removeCompletelyFromCart(product: Product): void {
    this.cart = this.cart.filter(i => i.product.productId !== product.productId);
  }
}
