import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../todo/services/local-storage.service';
import { DataService } from '../todo/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService, private router:Router,private dataService:DataService){
  }
  
  canActivate(){
    if (this.dataService.isUserLoggedIn()) {
      return true;
    }
    else {
      this.localStorageService.clearAll();
      this.router.navigate(['/login']);
      return false;
    }
  }

}
