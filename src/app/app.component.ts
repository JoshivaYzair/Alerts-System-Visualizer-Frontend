import { Component } from '@angular/core';
import { LoginEventService } from './Services/LoginEventService';
import { AuthService } from './Services/auth.service';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'sidenav';
  isLoggedIn: boolean = false;

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private loginEventService: LoginEventService, private _authService: AuthService) {
    if (this._authService.isAuthenticated() != false) this.isLoggedIn = true
    this.loginEventService.loginSuccessEvent.subscribe(() => {
      this.isLoggedIn = this._authService.isAuthenticated();
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
