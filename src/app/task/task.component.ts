import { Component } from '@angular/core';

import { TaskService } from '../_service/task';
import { XLarge } from './x-large';

@Component({
  selector: 'task',
  providers: [
    TaskService
  ],
  styleUrls: ['./task.component.css'],
  templateUrl: './task.component.html'
})
export class TaskComponent {
  // TypeScript public modifiers
  constructor(public service: TaskService) {

  }

  ngOnInit() {
    console.log('hello `task` component');
  }

  startTasks() {
    console.log("startTasks!!!!");
    // this.service.startTasks().subscribe(data => {
    //   console.log(data.data);
    // });
  }
}
