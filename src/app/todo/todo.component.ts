import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  isNav:any;
  constructor(private navbarService:NavbarService, private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.navbarService.isNav.subscribe((value)=>{
      console.log(value);
      this.isNav= value;
    });
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

}
