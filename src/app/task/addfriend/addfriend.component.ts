import {Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { BloggerService } from '../../_service/blogger';

@Component({
  selector: 'addfrienddialog',
  providers: [
    BloggerService
  ],
  styleUrls: ['./addfriend.component.css'],
  templateUrl: './addfriend.component.html',
})
export class AddFriendDialogComponent {
   model = {
    name:'',
    url:'',
    taskjs:''
   }
   constructor(public dialogRef: MdDialogRef<AddFriendDialogComponent>,
    public service:BloggerService) {

   }

   postBlogger(){
     //return;
     this.service.postBlogger(this.model).subscribe(data => {
        console.log('postBlogger:',data);
        this.dialogRef.close('1');
        alert("提交成功！");
    });;
   }

   ngOnInit() {
     console.log('hello `addfrienddialog` component');
   }
}

