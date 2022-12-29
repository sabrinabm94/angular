import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @HostBinding('class') class: string = "app-not-found-page";

  constructor() { }

  ngOnInit(): void {
  }

}
