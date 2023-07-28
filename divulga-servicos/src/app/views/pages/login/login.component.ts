import { Component } from '@angular/core';
import { ILogin } from 'src/app/utils/interfaces/Ilogin.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  public componentParams: ILogin = {
    email: this.email,
    password: this.password
  };

  public loginUser(event: any) {
    event.preventDefault();
    this.email = event.target[0].value;
    this.password = event.target[0].value;
    console.log(event);
    console.log(this.email);
    console.log(this.password);
  }
}
