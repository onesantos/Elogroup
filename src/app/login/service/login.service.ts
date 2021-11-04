import { Injectable } from "@angular/core";
import {UserForm} from '../user-form';

@Injectable({
    providedIn: 'root'
})
export class UserFormService {
    private storage: Storage;

    constructor() {
        this.storage = window.localStorage;
    }

    public save(user: UserForm) {
        if (!user.id) {
            user.id = this.getNextId();
        }
        this.storage.setItem(String(user.id), JSON.stringify(user));
    }

    private getNextId(): number {
        let ids = JSON.parse(this.storage.getItem('idsUsers'));
        if (ids) {
            ids.count = ids.count + 1;
            this.storage.setItem('idsUsers', JSON.stringify(ids));
          } else {
            ids = {count: 1};
            this.storage.setItem('idsUser', JSON.stringify(ids));
          }
          return ids.count;
        }
      
        public getAll(): UserForm[] {
          const usersList: UserForm[] = [];
          const keys = Object.keys(this.storage);
          for (const key of keys) {
            const regExpOnlyNumber = new RegExp(/^[0-9]*$/);
            if (key !== 'idsUsers' && regExpOnlyNumber.test(key)) {
              const auxUser: UserForm = JSON.parse(this.storage.getItem(key));
              console.log(auxUser);
              usersList.push(auxUser);
            }
          }
          return usersList;
    }
}