import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit-dialog',
  template: `
    <div class="dialog-header">
      <div class="dialog-title">Edit user</div>
      <button mat-icon-button class="close-btn" (click)="close()"><mat-icon>close</mat-icon></button>
    </div>
    <form [formGroup]="form" (ngSubmit)="save()">
      <div class="dialog-body">
        <mat-form-field appearance="outline" class="full">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email">
          <mat-error *ngIf="form.get('email')?.hasError('email')">Invalid email</mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" class="full">
          <mat-label>New password</mat-label>
          <input matInput type="password" formControlName="password">
        </mat-form-field>
      </div>
      <div class="dialog-footer">
        <button mat-stroked-button type="button" (click)="close()">Cancel</button>
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">Save</button>
      </div>
    </form>
  `,
  styles: [`
    :host { display:block; font-family: Roboto, Arial, sans-serif; }
    .dialog-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background: linear-gradient(90deg,#4f46e5,#06b6d4); color:#fff; border-top-left-radius:8px; border-top-right-radius:8px; }
    .dialog-title { font-weight:600; }
    .close-btn { color: rgba(255,255,255,0.9); }
    .dialog-body { padding:18px; background:#fff; display:flex; flex-direction:column; gap:12px; }
    .full { width:100%; }
    .dialog-footer { display:flex; justify-content:flex-end; gap:12px; padding:12px 18px; background:#fff; border-bottom-left-radius:8px; border-bottom-right-radius:8px; }
  `]
})
export class UserEditDialogComponent {
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<UserEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.form = this.fb.group({ email: [data.email || '', [Validators.email]], password: [''] });
  }
  save() { if (this.form.invalid) return; this.dialogRef.close(this.form.value); }
  close() { this.dialogRef.close(); }
}
