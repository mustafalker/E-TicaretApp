import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-ana-sayfa',
  templateUrl: './ana-sayfa.component.html',
  styleUrls: ['./ana-sayfa.component.css']
})
export class AnaSayfaComponent implements OnInit {
  products: Product[] = [];
  searchText: string = '';
  filteredProducts: Product[] = [];

  constructor(
    private keycloak: KeycloakService, 
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  logout() {
    this.keycloak.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(error => {
      console.error('Çıkış işlemi başarısız:', error);
    });
  }

  onAction(option: string) {
    console.log(`Seçilen seçenek: ${option}`);
  }

  filterProducts() {
    const filterTextLower = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(filterTextLower)
    );
  }
}
