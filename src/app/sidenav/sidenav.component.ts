import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'side-nav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleMenu = new EventEmitter();

  routeLinks: any[] = []; 

  constructor(public authService: AuthService) {
    this.authService.getRouteLinks().subscribe({
      next: (value) => {
        this.routeLinks = value;
      }
    });
  } 

}
