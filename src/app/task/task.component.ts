import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { TaskService } from '../_service/task';
import { BloggerService } from '../_service/blogger';
import { AddBloggerDialogComponent } from './addblogger';


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
  bloggers = [{
    isShow:false,
    name: 'yipeng',
    createTime: '2017-01-01 10:00',
    url: 'http://115.29.51.196',
    taskjs:''
  }];

  editingBlogger = {};

  taskHasStarted: Boolean = false;


  constructor(public taskservice: TaskService,
    public bloggerservice: BloggerService,
    public dialog: MdDialog) {

  }

  ngOnInit() {
    console.log('hello `task` component');
    // 订阅
    this.bloggerservice.blogerList.subscribe(data => {
      data = data.data;
      for (let i = 0; i < data.length; i++) {
        data.isShow = false;
      }
      this.bloggers = data;
    });
    this.loadBloggers();
    this.loadTaskState();
  }

  addBlogger() {
    console.log("addBlogger!!!!");
    let dialogRef = this.dialog.open(AddBloggerDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadBloggers();
    });
  }

  editBlogger(model) {
    model.isShow = true;
  }

  cancelEditBlogger(model) {
    model.isShow = false;
  }

  submitEditedBlogger(model) {
    console.log("editBlogger!!!!");
    this.bloggerservice.editBlogger(model).subscribe(data => {
      console.log('editBlogger:', data);
      alert("修改成功！");
    });;
  }

  startTasks() {
    console.log("startTasks!!!!");
    this.taskservice.startTasks().subscribe(data => {
      console.log("startTasks:", data.data);
    });
  }

  loadBloggers() {
    this.bloggerservice.getBloggers();
  }

  loadTaskState() {
    this.taskservice.taskState().subscribe(data => {
      this.taskHasStarted = data.started
    });
  }

}


