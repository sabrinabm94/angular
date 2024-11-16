import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmailUtils {
  validEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
}
