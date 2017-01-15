import {Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'addfrienddialog',
  templateUrl: './addfriend.component.html',
})
export class AddFriendDialogComponent {
   constructor(public dialogRef: MdDialogRef<AddFriendDialogComponent>) {

   }

   ngOnInit() {
    console.log('hello `addfrienddialog` component');
  }
}

