import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { map, take } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const isAuthenticated = await this.authService.isAuthenticated()
      .pipe(
        take(1),
        map(authenticated => !!authenticated)
      )
      .toPromise();

    if (isAuthenticated) {
      return true; // User is authenticated, allow access
    } else {
      // this.router.navigate(['/login']);
      return true; // User is not authenticated, redirect to login or another route
    }
  }
}