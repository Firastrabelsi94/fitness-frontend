import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 form: FormGroup;
  saving = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.saving = true;
    const { username, password } = this.form.value;

    this.auth.login(username!, password!).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/user/profile']);
      },
      error: err => {
        console.error('Login error', err);
        this.saving = false;
        const msg = err?.error?.message || err?.message || 'Login failed';
        this.snack.open(msg, 'Close', { duration: 4000 });
      }
    });
  }
}
