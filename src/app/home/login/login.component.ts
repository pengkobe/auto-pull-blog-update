import { Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Title } from '../title';
import { AppState } from '../../app.service';

@Component({
  selector: 'logindialog',
  providers: [
    Title
  ],
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginDialogComponent {
   usermodel = {
    username:'py',
    password:'123',
   }

   constructor(public dialogRef: MdDialogRef<LoginDialogComponent>,
    public service:Title,public appState: AppState) {
   }

   login(){
     this.service.getData(this.usermodel.username,this.usermodel.password).subscribe(data => {
        console.log('login:',data);
        // 全局设置token
        if(data && data.success && data.data ){
           this.appState.set('token', data.data.token);
        }
        this.dialogRef.close('1');
        alert("登录成功！");
    });;
   }

   ngOnInit() {
     console.log('hello `LoginDialog` component');
   }
}

