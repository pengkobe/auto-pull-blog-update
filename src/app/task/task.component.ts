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
  news = [
    {
      from: {name : 'test'},
      title: 'test title',
      publishTime: new Date('1/1/16'),
    },
  ];

  // TypeScript public modifiers
  constructor(public taskservice: TaskService, public bloggerservice: BloggerService,
    public dialog: MdDialog) {

  }

  ngOnInit() {
    console.log('hello `task` component');
  }

  addBlogger(){
    console.log("addBlogger!!!!");
    // this.bloggerservice.addBlogger().subscribe(data => {
    //   console.log('addBlogger:',data.data);
    // });

    this.dialog.open(AddFriendDialogComponent);
  }

  startTasks() {
    console.log("startTasks!!!!");
    this.taskservice.startTasks().subscribe(data => {
      console.log("startTasks:",data.data);
    });
  }

  loadBloggerNews(){
    this.bloggerservice.getBloggerNews().subscribe(data => {
      console.log('getBloggerNews:',data.data);
      this.news=data.data;
    });
  }
}


