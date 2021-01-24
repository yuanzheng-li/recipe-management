import { Injectable } from "@angular/core";

import { User } from '../auth/user.model';

export type UserJSON = {
  email: string;
  id: string;
  _token: string;
  _expiresDate: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor() {}

  getUserDataInLocalStorage(): UserJSON | null {
    const userStr = localStorage.getItem('userData');

    if (!userStr) {
      return null;
    }

    return JSON.parse(userStr);
  }
}
