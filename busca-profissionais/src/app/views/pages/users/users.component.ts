import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  public pageParams: object = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.pageParams = this.route.snapshot.params;
  }
}
