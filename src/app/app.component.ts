import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CFPD';
  showFiller = false;
  public isExpanded = true;
  public isLogin = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(public authService: AuthService) {
    this.authService.isAuthenticated().subscribe({
      next: (val => {
        this.isExpanded = val;
        this.isLogin = val;
      })
    })
    console.log(this.authService.isAuthenticated());
  }
}
