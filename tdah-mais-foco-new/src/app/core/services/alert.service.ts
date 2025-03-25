import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertMessageTriggerSubject = new BehaviorSubject<boolean>(false);
  private alertMessageTypeSubject = new BehaviorSubject<string>('error');
  private alertMessageSubject = new BehaviorSubject<string>('');

  public alertMessageTrigger$ = this.alertMessageTriggerSubject.asObservable();
  public alertMessageType$ = this.alertMessageTypeSubject.asObservable();
  public alertMessage$ = this.alertMessageSubject.asObservable();

  constructor() {}

  public alertMessageTriggerFunction(
    message: string,
    type: string,
    trigger: boolean
  ) {
    if (trigger) {
      this.alertMessageTriggerSubject.next(trigger);
      this.alertMessageTypeSubject.next(type || 'error');

      if (message) {
        console.error(message);
        this.alertMessageSubject.next(message);
      }
    }
  }

  public alertMessageEmmited() {
    this.alertMessageTriggerSubject.next(false);
    this.alertMessageSubject.next('');
  }
}
