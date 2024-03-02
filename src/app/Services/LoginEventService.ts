import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginEventService {
  loginSuccessEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  emitLoginSuccessEvent(): void {
    this.loginSuccessEvent.emit();
  }
}
