import { Component } from "@angular/core";
import { FormControl, FormGroup, MinLengthValidator, Validators } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent {
  isLoading = false;

  loginForm = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor() {}
  ngOnInit() {
    this.resetForm();
    console.log('from auth');
  }

  onLogin(form) {
    console.log(form);
  }

  resetForm() {
    this.loginForm.reset();
    this.isLoading = false;
  }
}
