import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  isNav:any;
  
  constructor() { }

  ngOnInit() {
  }

}
