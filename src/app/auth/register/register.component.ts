import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  submit() {
    if (this.form.invalid) return;
    const { username, email, password } = this.form.value;
    this.auth.register(username!, email!, password!).subscribe({
      next: () => this.router.navigate(['/user/profile']),
      error: err => console.error(err)
    });
  }
}
