import { Component } from '@angular/core';

import { TaskService } from '../_service/task';
import { BloggerService } from '../_service/blogger';
import { XLarge } from './x-large';

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
  constructor(public taskservice: TaskService, public bloggerservice: BloggerService) {

  }

  ngOnInit() {
    console.log('hello `task` component');
  }

  addBlogger(){
    console.log("addBlogger!!!!");
    this.bloggerservice.addBlogger().subscribe(data => {
      console.log('addBlogger:',data.data);
    });
  }

  startTasks() {
    console.log("startTasks!!!!");
    this.taskservice.startTasks().subscribe(data => {
      console.log("startTasks:",data.data);
    });
  }
}
