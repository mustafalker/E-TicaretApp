import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  paymentData: any = {};
  paymentResponse: any;

  constructor(private paymentService: PaymentService, private router: Router) { }

  onSubmit() {
    this.paymentService.processPayment(this.paymentData).subscribe(
      response => {
        this.paymentResponse = response;
      },
      error => {
        console.error('Error processing payment', error);
      }
    );
  }
  goBack() {
    this.router.navigate(['/ana-sayfa']);
  }
}
