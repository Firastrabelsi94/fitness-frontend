import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, UserProfile } from '../user.service';
import { UserViewDialogComponent } from '../dialogs/user-view-dialog.component';
import { UserEditDialogComponent } from '../dialogs/user-edit-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: UserProfile[] = [];
  columns = ['id','username','email','roles','actions'];
  constructor(private userService: UserService, private dialog: MatDialog, private snack: MatSnackBar) { }

  ngOnInit(): void { this.load(); }

  load() { this.userService.listUsers().subscribe({ next: res => this.users = res, error: err => this.snack.open('Failed to load users','Close',{duration:3000}) }); }

  view(u: UserProfile) { this.dialog.open(UserViewDialogComponent, { data: u, width: '420px', panelClass: 'app-dialog-centered' }); }

  edit(u: UserProfile) {
    const ref = this.dialog.open(UserEditDialogComponent, { data: u, width: '480px', panelClass: 'app-dialog-centered' });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUserById(u.id, result).subscribe({ next: res => { this.snack.open('User updated', 'Close', { duration: 2500 }); this.load(); }, error: e => this.snack.open('Update failed','Close',{duration:2500}) });
      }
    });
  }

  delete(u: UserProfile) {
    const ref = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete user', message: `Delete ${u.username}?` }, width: '360px', panelClass: 'app-dialog-centered' });
    ref.afterClosed().subscribe(ok => {
      if (ok) {
        this.userService.deleteUser(u.id).subscribe({ next: () => { this.snack.open('Deleted', 'Close', { duration:2000 }); this.load(); }, error: e => this.snack.open('Delete failed','Close',{duration:2500}) });
      }
    });
  }
}
