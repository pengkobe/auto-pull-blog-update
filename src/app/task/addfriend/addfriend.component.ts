import {Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'addfrienddialog',
  styleUrls: ['./addfriend.component.css'],
  templateUrl: './addfriend.component.html',
})
export class AddFriendDialogComponent {
   model = {
    name:'',
    url:'',
    taskJS:''
   }
   constructor(public dialogRef: MdDialogRef<AddFriendDialogComponent>) {

   }

   ngOnInit() {
    console.log('hello `addfrienddialog` component');
  }
}

