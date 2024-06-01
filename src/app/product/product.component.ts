import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      imageUrl: ['', Validators.required],
      categoryId: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products || [];
        this.toastr.success('Products fetched successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.toastr.error('Failed to fetch products.', 'Error');
      }
    });
  }

  getProductById(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.selectedProduct = product || null;
        this.toastr.success('Product fetched successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error fetching product:', err);
        this.toastr.error('Failed to fetch product.', 'Error');
        this.selectedProduct = null;
      }
    });
  }

  addProduct(): void {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (newProduct) => {
          this.products.push(newProduct);
          this.toastr.success('Product added successfully!', 'Success');
          this.productForm.reset({
            productId: 0,
            productName: '',
            description: '',
            price: 0,
            stockQuantity: 0,
            imageUrl: '',
            categoryId: 0
          });
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error adding product:', err);
          this.toastr.error('Failed to add product.', 'Error');
        }
      });
    } else {
      this.productForm.markAllAsTouched();
      this.toastr.error('Please fill all required fields correctly.', 'Error');
    }
  }

  updateProduct(product: Product): void {
    if (product.productId) {
      this.productService.updateProduct(product.productId, product).subscribe({
        next: (updatedProduct) => {
          const index = this.products.findIndex(p => p.productId === updatedProduct.productId);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.toastr.success('Product updated successfully!', 'Success');
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.toastr.error('Failed to update product.', 'Error');
        }
      });
    }
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.productId !== id);
        this.toastr.success('Product deleted successfully!', 'Success');
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.toastr.error('Failed to delete product.', 'Error');
      }
    });
  }
}
