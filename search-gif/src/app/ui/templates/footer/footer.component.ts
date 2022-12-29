import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  @HostBinding('class') class: string = "app-footer";

  constructor() { }

  ngOnInit(): void {
  }

}
