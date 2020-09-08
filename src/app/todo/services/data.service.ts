import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private localStorageService:LocalStorageService, private http:HttpClient) { }

  isUserLoggedIn(): boolean {
    if (this.localStorageService.getUser()) {return true;} 
    else {return false;}
  }

  postSocialLogin( socialData:any ){
    return this.http.post('postSocialLogin', socialData);
  }

  postLogin(loginData:any){
    return this.http.post('login', loginData);
  }

  verifyEmail(emailData:any){
    return this.http.post('verifyEmail', emailData);
  }

  postSignup(signupData:any){
    return this.http.post('signup', signupData);
  }

  forgotPassword(forgotData:any){
    return this.http.post('forgotPassword', forgotData);
  }

  resetPassword(resetData:any, username:any){
    return this.http.post('resetPassword/'+username, resetData);
  }

  getLogout(){
    return this.http.get('logout');
  }

  postcontact(contactData:any){
    return this.http.post('contact', contactData);
  }

  getProfile(){
    return this.http.get('profile/'+this.localStorageService.getUser());
  }

  updateProfileImage(image:any){
    return this.http.post('profile/'+ this.localStorageService.getUser()+'/uploadPhoto', image)
  }

  updateProfileVideo(image:any){
    return this.http.post('profile/'+ this.localStorageService.getUser()+'/uploadVideo', image)
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

  stripePayment(token:any){
    return this.http.post('stripe/payment', token);
  }

  razorPayOrder(orderData:any){
    return this.http.post('razorPayOrder', orderData);
  }

  razorPayConfirmation(paymentData:any){
    return this.http.post('/razorPayConfirmation', paymentData);
  }

}
