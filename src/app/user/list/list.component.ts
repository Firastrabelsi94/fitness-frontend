import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, UserProfile } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: UserProfile[] = [];
columns = [
  'id',
  'username',
  'email',
  'roles',
  'subscriptionType',
  'subscriptionStartDate',
  'subscriptionEndDate',
  'actions'
];
  // modal state
  selectedUser: UserProfile | null = null;
  editingUser: Partial<UserProfile> | null = null;
  confirmTarget: UserProfile | null = null;
  showViewModal = false;
  showEditModal = false;
  showConfirmModal = false;

  constructor(private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void { this.load(); }

  load() { this.userService.listUsers().subscribe({ next: res => this.users = res, error: err => this.snack.open('Failed to load users','Close',{duration:3000}) }); }

  view(u: UserProfile) {
    this.selectedUser = u;
    this.showViewModal = true;
  }

  closeView() { this.showViewModal = false; this.selectedUser = null; }

 edit(u: UserProfile) {
  this.editingUser = {
    id: u.id,
    email: u.email,
    subscriptionType: u.subscriptionType,
    subscriptionStartDate: u.subscriptionStartDate,
    subscriptionEndDate: u.subscriptionEndDate
  };
  this.showEditModal = true;
}

  saveEdit() {
  if (!this.editingUser || !this.editingUser.id) return;

  const payload: any = {
    email: this.editingUser.email,
    subscriptionType: this.editingUser.subscriptionType,
    subscriptionStartDate: this.editingUser.subscriptionStartDate,
    subscriptionEndDate: this.editingUser.subscriptionEndDate
  };

  if ((this.editingUser as any).password) {
    payload.password = (this.editingUser as any).password;
  }

  this.userService.updateUserById(this.editingUser.id, payload).subscribe({
    next: () => {
      this.snack.open('User updated', 'Close', { duration: 2500 });
      this.load();
      this.showEditModal = false;
      this.editingUser = null;
    },
    error: () => this.snack.open('Update failed', 'Close', { duration: 2500 })
  });
}


  closeEdit() { this.showEditModal = false; this.editingUser = null; }

  confirmDelete(u: UserProfile) { this.confirmTarget = u; this.showConfirmModal = true; }

  cancelDelete() { this.showConfirmModal = false; this.confirmTarget = null; }

  deleteConfirmed() {
    if (!this.confirmTarget) return;
    this.userService.deleteUser(this.confirmTarget.id).subscribe({ next: () => { this.snack.open('Deleted','Close',{duration:2000}); this.load(); this.showConfirmModal = false; this.confirmTarget = null; }, error: e => this.snack.open('Delete failed','Close',{duration:2500}) });
  }
}
