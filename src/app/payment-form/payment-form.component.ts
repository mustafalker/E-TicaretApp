import { Component } from '@angular/core';
import { PaymentService } from '../services/payment.service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent {
  paymentData = {
    cardHolderName: '',
    cardNumber: '',
    expireMonth: '',
    expireYear: '',
    cvc: '',
    price: ''
  };
  paymentResponse: any;

  constructor(private paymentService: PaymentService, private router: Router, private toastr: ToastrService,
    private sanitizer : DomSanitizer
  ) { }

  onSubmit(form: any) {
    if (form.valid) {
      this.paymentService.processPayment(this.paymentData).subscribe(
        (response) => {
          this.paymentResponse = response;
          this.toastr.success('Payment processed successfully', 'Success');
        },
        (error) => {
          console.error('Payment processing failed', error);
          this.toastr.error('Payment processing failed', 'Error');
        }
      );
    }
  }
  goBack() {
    this.router.navigate(['/ana-sayfa']);
  }
}
