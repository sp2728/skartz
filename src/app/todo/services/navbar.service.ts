import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {


  constructor() {
   }

  public isNav= new BehaviorSubject(true);
  
  hide() { 
    this.isNav.next(false);
   }

  show() {
     this.isNav.next(true);
    }
}
