import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="dialog-header">
      <div class="dialog-title">{{ data.title || 'Confirm' }}</div>
      <button mat-icon-button class="close-btn" (click)="close(false)">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    <div class="dialog-body">{{ data.message || 'Are you sure?' }}</div>
    <div class="dialog-footer">
      <button mat-stroked-button class="btn-cancel" (click)="close(false)">Cancel</button>
      <button mat-flat-button color="warn" class="btn-confirm" (click)="close(true)">{{ data.confirmText || 'Confirm' }}</button>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Roboto, Arial, sans-serif; }
    .dialog-header { display:flex; align-items:center; justify-content:space-between; padding:16px 20px; background: linear-gradient(90deg,#4f46e5,#06b6d4); color: #fff; border-top-left-radius:8px; border-top-right-radius:8px; }
    .dialog-title { font-weight:600; font-size:16px; }
    .close-btn { color: rgba(255,255,255,0.85); }
    .dialog-body { padding:20px; font-size:14px; color:#333; background: #fff; }
    .dialog-footer { display:flex; justify-content:flex-end; gap:12px; padding:16px 20px; background: #fff; border-bottom-left-radius:8px; border-bottom-right-radius:8px; }
    .btn-cancel { color: rgba(0,0,0,0.7); }
    .btn-confirm { min-width:96px; }
  `]
})
export class ConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}
  close(result: boolean) { this.dialogRef.close(result); }
}
