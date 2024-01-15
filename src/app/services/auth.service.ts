// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin = true;
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private _sideMenuLinks: BehaviorSubject<any> = new BehaviorSubject([]);
  private routeLinks: any[] = [

  ];
  constructor(private httpClient:HttpClient){
    this.loadSideMenu();
  }

  public exportToExcel()
  {
    return this.httpClient.get("httpurl/action",
    {observe:'response', responseType:'blob'})
  }


  // Set authentication status (e.g., after successful login)
  login() {
    this.loadSideMenu();
    this._isAuthenticated.next(true);
  }

  // Clear authentication status (e.g., after logout)
  logout() {
    this._isAuthenticated.next(false);
    this.isAdmin = false;
  }

  // Get authentication status
  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  getRouteLinks(): Observable<any[]> {
    return this._sideMenuLinks.asObservable();
  }

  loadSideMenu() {
    if (this.isAdmin) {
      this.routeLinks = [...[{ link: "dashboard", name: "Dashboard", icon: "dashboard" },
      { link: "view-team", name: "View Team", icon: "supervised_user_circle" },
      { link: "user", name: "Create User", icon: "create" },
      { link: "user", name: "View User", icon: "account_circle" },
      { link: "attendance", name: "Attendance", icon: "av_timer" },
        // { link: "reset-password", name: "Reset Password", icon: "lock_open" },]
      ]]
    }
    else {
      this.routeLinks = [...[{ link: "dashboard", name: "Dashboard", icon: "dashboard" },
        // { link: "view-team", name: "View Team", icon: "supervised_user_circle" },
        // { link: "user", name: "Create User", icon: "create" },
        // { link: "user", name: "View User", icon: "account_circle" },
        // { link: "attendance", name: "Attendance", icon: "av_timer" },
        // { link: "reset-password", name: "Reset Password", icon: "lock_open" },]
      ]]
    }
    this._sideMenuLinks.next(this.routeLinks);
  }
}

