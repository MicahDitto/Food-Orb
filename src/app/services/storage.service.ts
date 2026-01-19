import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  getAccessToken(): string | null {
    return this.getItem('access-token');
  }

  setAccessToken(token: string): void {
    this.setItem('access-token', token);
  }

  removeAccessToken(): void {
    this.removeItem('access-token');
  }

  isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
