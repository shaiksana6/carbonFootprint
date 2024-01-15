import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth.service';
import { of, throwError } from 'rxjs';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService], // Provide your services here
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with required controls', () => {
    expect(component.loginForm.get('username')).toBeTruthy();
    expect(component.loginForm.get('password')).toBeTruthy();
  });

  it('should mark form as touched on login click if invalid', () => {
    const markAllAsTouchedSpy = spyOn(component.loginForm, 'markAllAsTouched');
    component.onLoginClick();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });

  it('should call login service and navigate on successful login', fakeAsync(() => {
    const loginSpy = spyOn(component.authService, 'login');
    const navigateSpy = spyOn(component.router, 'navigate');
    spyOn(component.httpClient, 'post').and.returnValue(of({}));
    component.loginForm.setValue({ username: 'test@example.com', password: 'password' });
    component.onLoginClick();
    tick();
    expect(loginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  }));

  it('should handle API error and set error on password control', fakeAsync(() => {
    const loginSpy = spyOn(component.authService, 'login');
    spyOn(component.httpClient, 'post').and.returnValue(throwError({}));
    component.loginForm.setValue({ username: 'test@example.com', password: 'password' });
    component.onLoginClick();
    tick();
    //expect(loginSpy).not.toHaveBeenCalled();
    expect(component.loginForm.get('password')?.hasError('apiError')).toBe(true);
  }));

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBe(false);
    component.togglePasswordVisibility();
    expect(component.showPassword).toBe(true);
  });
});
