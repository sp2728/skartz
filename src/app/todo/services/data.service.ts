import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private localStorageService:LocalStorageService, private http:HttpClient) { }

  postLogin(loginData:any){
    return this.http.post('login', loginData);
  }

  postSignup(signupData:any){
    return this.http.post('signup', signupData);
  }

  getLogout(){
    return this.http.get('logout');
  }

  getProfile(){
    return this.http.get('profile/'+this.localStorageService.getUser());
  }

  updateProfileImage(image:any){
    return this.http.post('profile/'+ this.localStorageService.getUser()+'/uploadPhoto', image)
  }

  deleteProfileImage(){
    return this.http.get('profile/'+ this.localStorageService.getUser()+'/deletePhoto');
  }

  getTodos(){
    return this.http.get('getTodos');
  }

  addTodo(todoData:any){
    return this.http.post('addTodo', todoData);
  }

  deleteTodo(id:any){
    return this.http.delete('deleteTodo/'+id);
  }

  triggerStatus(id:any, status:any){
    return this.http.put('triggerStatus/'+id, {status: status});
  }
}
