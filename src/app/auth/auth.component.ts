import { Component } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { LoginData } from "./login.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent {
  isLoading = false;
  isLoggedIn: boolean = localStorage.getItem('user') !== 'null';
  showConfirmationDialog: boolean;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.showConfirmationDialog = this.isLoggedIn;
  }

  onDontLogout() {
    this.showConfirmationDialog = false;
  }

  onConfirmLogOut() {
    this.authService.signOut();
  }

  onLogin(form: LoginData) {
    this.isLoading = true;
    this.authService
      .signIn(form.email, form.password);
  }

  resetForm() {
    this.loginForm.reset();
    this.isLoading = false;
  }
}
