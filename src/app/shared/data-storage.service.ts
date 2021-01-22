import { Injectable } from "@angular/core";

import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() {}

  getUserDataInLocalStorage(): User | null {
    const userStr = localStorage.getItem('userData');

    if (!userStr) {
      return null;
    }

    return JSON.parse(userStr);
  }
}
