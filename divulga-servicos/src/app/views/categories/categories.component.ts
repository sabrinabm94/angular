import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public pageParams: object = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageParams = this.route.snapshot.params;
  }
}
