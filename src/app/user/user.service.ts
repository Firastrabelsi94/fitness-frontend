import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile { id: number; username: string; email: string; roles: string[] }
export interface UpdateProfile { email?: string; password?: string }

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/user/me');
  }

  updateProfile(payload: UpdateProfile) {
    return this.http.put<UserProfile>('/api/user/me', payload);
  }

  // management
  listUsers(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>('/api/user');
  }

  getUserById(id: number) {
    return this.http.get<UserProfile>(`/api/user/${id}`);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(`/api/user/${id}`);
  }

  updateUserById(id: number, payload: UpdateProfile) {
    return this.http.put<UserProfile>(`/api/user/${id}`, payload);
  }
}
