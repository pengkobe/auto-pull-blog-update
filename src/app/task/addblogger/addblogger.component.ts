import {Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { BloggerService } from '../../_service/blogger';

@Component({
  selector: 'addbloggerdialog',
  providers: [
    BloggerService
  ],
  styleUrls: ['./addblogger.component.css'],
  templateUrl: './addblogger.component.html',
})
export class AddBloggerDialogComponent {
   model = {
    name:'',
    url:'',
    taskjs:''
   }
   constructor(public dialogRef: MdDialogRef<AddBloggerDialogComponent>,
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
     console.log('hello `addbloggerdialog` component');
   }
}

