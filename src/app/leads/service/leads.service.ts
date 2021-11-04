import {Injectable} from '@angular/core';
import {Leads} from '../leads';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public save(lead: Leads) {
    if (!lead.id) {
      lead.id = this.getNextId();
    }
    this.storage.setItem(String(lead.id), JSON.stringify(lead));
  }


  private getNextId(): number {
    let ids = JSON.parse(this.storage.getItem('idsLeads'));
    if (ids) {
      ids.count = ids.count + 1;
      this.storage.setItem('idsLeads', JSON.stringify(ids));
    } else {
      ids = {count: 1};
      this.storage.setItem('idsLeads', JSON.stringify(ids));
    }
    return ids.count;
  }

  public getAll(): Leads[] {
    const leadsList: Leads[] = [];
    const keys = Object.keys(this.storage);
    for (const key of keys) {
      const regExpOnlyNumber = new RegExp(/^[0-9]*$/);
      if (key !== 'idsLeads' && regExpOnlyNumber.test(key)) {
        const auxLead: Leads = JSON.parse(this.storage.getItem(key));
        console.log(auxLead);
        leadsList.push(auxLead);
      }
    }
    return leadsList;
  }
}
