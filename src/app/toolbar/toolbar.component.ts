import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isLoggedIn = false; // Set this to true when the user is logged in
  userEmail = 'user@example.com'; // Replace with the actual user email

  constructor(public authService: AuthService,private router:Router) {
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe({
      next: (val => {
        this.isLoggedIn = val;
      })
    })
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Implement your logout logic here
    console.log('Logout clicked!');
    // You might want to redirect the user to the login page or perform other actions.
  }

}
