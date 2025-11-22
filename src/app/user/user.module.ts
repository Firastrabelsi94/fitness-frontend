import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ListComponent } from './list/list.component';

import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UserEditDialogComponent } from './dialogs/user-edit-dialog.component';
import { UserViewDialogComponent } from './dialogs/user-view-dialog.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [ProfileComponent, ListComponent, UserViewDialogComponent, UserEditDialogComponent, ConfirmDialogComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class UserModule { }
