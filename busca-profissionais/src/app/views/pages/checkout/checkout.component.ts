import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  public pageParams: object = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageParams = this.route.snapshot.params;
  }
}
