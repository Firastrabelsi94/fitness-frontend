import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-view-dialog',
  template: `
    <div class="dialog-header">
      <div class="dialog-title">User details</div>
      <button mat-icon-button class="close-btn" (click)="close()"><mat-icon>close</mat-icon></button>
    </div>
    <div class="dialog-body">
      <div class="row"><span class="label">ID</span><span class="val">{{ data.id }}</span></div>
      <div class="row"><span class="label">Username</span><span class="val">{{ data.username }}</span></div>
      <div class="row"><span class="label">Email</span><span class="val">{{ data.email }}</span></div>
      <div class="row"><span class="label">Roles</span><span class="val">{{ data.roles?.join(', ') }}</span></div>
    </div>
    <div class="dialog-footer">
      <button mat-stroked-button (click)="close()">Close</button>
    </div>
  `,
  styles: [`
    :host { display:block; font-family: Roboto, Arial, sans-serif; }
    .dialog-header { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background: linear-gradient(90deg,#4f46e5,#06b6d4); color:#fff; border-top-left-radius:8px; border-top-right-radius:8px; }
    .dialog-title { font-weight:600; }
    .close-btn { color: rgba(255,255,255,0.9); }
    .dialog-body { padding:18px; background:#fff; color:#333; }
    .row { display:flex; justify-content:space-between; padding:8px 0; border-bottom: 1px solid rgba(0,0,0,0.04); }
    .label { color:#666; font-size:13px; }
    .val { font-weight:600; }
    .dialog-footer { display:flex; justify-content:flex-end; padding:12px 18px; background:#fff; border-bottom-left-radius:8px; border-bottom-right-radius:8px; }
  `]
})
export class UserViewDialogComponent {
  constructor(public dialogRef: MatDialogRef<UserViewDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  close() { this.dialogRef.close(); }
}
