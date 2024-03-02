import { Component } from '@angular/core';
import { LoginEventService } from './Services/LoginEventService';
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

  constructor(private loginEventService: LoginEventService) {
    // Verifica si hay un token en el localStorage al inicializar el componente
    this.isLoggedIn = !!localStorage.getItem('token');
    this.loginEventService.loginSuccessEvent.subscribe(() => {
      this.isLoggedIn = !this.isLoggedIn;
    });
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
