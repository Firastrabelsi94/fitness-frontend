import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
   profile: any = null;
  form: FormGroup;
  saving = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
       username: ['', Validators.required],
      email: ['', [Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.userService.getProfile().subscribe({
      next: res => {
        this.profile = res;
        this.form.patchValue({ 
           username: res.username,
          email: res.email, password: '' });
      },
      error: err => console.error(err)
    });
  }
formatRole(role: string): string {
  if (!role) return '';
  // Remove 'ROLE_' prefix and capitalize
  return role.replace('ROLE_', '').toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
}
  save() {
    if (this.form.invalid) return;
    this.saving = true;

    const payload: any = {};
      if (this.form.value.username) payload.username = this.form.value.username;
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
