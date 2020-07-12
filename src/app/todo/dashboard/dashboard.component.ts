import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('fform',  {static: false}) todoFormDirective;
  todoForm: FormGroup;
  todoData: any;
  todoList = [];
  submitted: any;
  date:any;
  user: any;
  error: any;
  num:any;

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getTodos();
    this.createForm();
    this.user = this.localStorageService.getUser();
    this.num=1;
    this.date = new Date().toLocaleDateString('en-CA');
    this.submitted = false;
  }

  createForm() {
    this.todoForm = this.fb.group({
      activity: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      category: ['', [Validators.required]],
      time: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid && this.user) {
      this.error="";
      this.todoData = this.todoForm.value;
      this.dataService.addTodo(this.todoData).subscribe((res) => {
        if (res['success']) {
          this.submitted = false;
          this.getTodos();
          this.todoForm.reset()
        }
      })
    }
    else if(!this.user){
      this.error = "Please Log in"
    }
  }

  getTodos() {
    this.dataService.getTodos().subscribe((res) => {
      this.todoList = res['todos']
    })
  }


  filter(num:any){
    this.num=num;
    if(this.num==1){
      this.getTodos();
    }
    else if(this.num==2){
      this.dataService.getTodos().subscribe((res)=>{
        this.todoList = res['todos'].filter(todo=> todo.status== "Incomplete");
      })    } 
    else{
      this.dataService.getTodos().subscribe((res)=>{
        this.todoList = res['todos'].filter(todo=> todo.status== "Complete");
      })
    }
  }

  dateFilter(event:any){
    console.log(new Date(event.target.value));
  }

  triggerStatus(todo: any) {
    this.dataService.triggerStatus(todo._id, todo.status).subscribe((res) => {
      if (res['success']) {
        this.getTodos();
      }
    })
  }
  
  deleteTodo(id: any) {
    this.dataService.deleteTodo(id).subscribe((res) => {
      if (res['success']) {
        console.log(res);
        this.getTodos();
      }
    })
  }

}


   // this.todoList.splice(this.todoList.findIndex(function (i) {
    //   return i['todoValue'] === item['todoValue'];
    // }), 1);
  // completeTodo(item: any) {
  //   let todo = this.todoList.find(obj => obj['activity'] == item['activity']);
  //   console.log(todo['status'])
  //   todo['status'] = "Complete"
  // }
  // inCompleteTodo(item: any) {
  //   let todo = this.todoList.find(obj => obj['activity'] == item['activity']);
  //   todo['status'] = "Incomplete"
  // }