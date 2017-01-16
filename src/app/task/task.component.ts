import { Component } from '@angular/core';
import { MdDialog,MdDialogRef } from '@angular/material';

import { TaskService } from '../_service/task';
import { BloggerService } from '../_service/blogger';
import { AddFriendDialogComponent } from './addfriend';


@Component({
  selector: 'task',
  providers: [
    TaskService,
    BloggerService
  ],
  styleUrls: ['./task.component.css'],
  templateUrl: './task.component.html'
})
export class TaskComponent {
  

  // TypeScript public modifiers
  constructor(public taskservice: TaskService, public bloggerservice: BloggerService,
    public dialog: MdDialog) {

  }

  ngOnInit() {
    console.log('hello `task` component');
  }

  addBlogger(){
    console.log("addBlogger!!!!");
    // 模拟数据
    // this.bloggerservice.addBlogger().subscribe(data => {
    //   console.log('addBlogger:',data.data);
    // });
    
    let dialogRef = this.dialog.open(AddFriendDialogComponent);
    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  startTasks() {
    console.log("startTasks!!!!");
    this.taskservice.startTasks().subscribe(data => {
      console.log("startTasks:",data.data);
    });
  }
 
}


