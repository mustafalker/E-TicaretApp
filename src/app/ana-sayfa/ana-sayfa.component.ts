import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ana-sayfa',
  templateUrl: './ana-sayfa.component.html',
  styleUrls: ['./ana-sayfa.component.css']
})
export class AnaSayfaComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  cart: { product: Product, quantity: number }[] = [];
  searchText: string = '';
  test: Date = new Date();

  constructor(
    private keycloak: KeycloakService,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
    this.toastr.toastrConfig.positionClass = 'toast-top-left';
  }

  logout() {
    this.keycloak.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Çıkış işlemi başarısız:', error);
      this.toastr.error('Çıkış işlemi başarısız', 'Hata');
    });
  }

  filterProducts() {
    const filterTextLower = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(filterTextLower)
    );
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
      this.cart = [];
    } else {
      this.toastr.warning('Sepetiniz boş', 'Uyarı');
    }
  }

  isInCart(product: Product): boolean {
    return this.cart.some(item => item.product.productId === product.productId);
  }

  getProductQuantity(product: Product): number {
    const cartItem = this.cart.find(item => item.product.productId === product.productId);
    return cartItem ? cartItem.quantity : 0;
  }
}
