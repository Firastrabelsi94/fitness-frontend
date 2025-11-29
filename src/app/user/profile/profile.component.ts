import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdateProfile, UserProfile, UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile | null = null;
  form: FormGroup;
  saving = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      email: ['', [Validators.email]],
      password: ['']
    });
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.userService.getProfile().subscribe({
      next: res => {
        this.profile = res;
        this.form.patchValue({ email: res.email, password: '' });
      },
      error: err => console.error(err)
    });
  }

  formatRole(role: string): string {
    if (!role) return '';
    return role.replace('ROLE_', '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;

    const payload: UpdateProfile = {};
    if (this.form.value.email) payload.email = this.form.value.email;
    if (this.form.value.password) payload.password = this.form.value.password;

    this.userService.updateProfile(payload).subscribe({
      next: res => {
        this.profile = res;
        this.form.patchValue({ password: '' });
        this.saving = false;
      },
      error: err => {
        console.error(err);
        this.saving = false;
      }
    });
  }
}
