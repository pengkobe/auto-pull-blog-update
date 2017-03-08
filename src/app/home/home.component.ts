import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { BloggerService } from '../_service/blogger';
import { NewsService } from '../_service/news';
import { XLarge } from './x-large';
import { MdDialog,MdDialogRef } from '@angular/material';
import { LoginDialogComponent } from './login';

@Component({
  selector: 'home',
  providers: [
    BloggerService,
    NewsService
  ],
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  hasNotLogin = true;
  name="";
  news = [
    {
      _id:'345423423423423',
      from: {name : 'test',_id:''},
      title: 'test title',
      publishTime: new Date('1/1/16'),
      hasRead:false
    },
  ];
  localState = { value: '' };
  token = null;

  constructor(public appState: AppState,
    public bloggerservice: BloggerService,
    public newsService :NewsService,
    public dialog: MdDialog) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    if(this.appState.get("name")){
      this.hasNotLogin = false;
      this.name = this.appState.get("name");
    }
    this.loadBloggerNews();
  }

  /**
   * [openLoginDialog 登录提示框]
   */
  openLoginDialog(){
    let dialogRef = this.dialog.open(LoginDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if(this.appState.get("name")){
        this.hasNotLogin = false;
        this.name = this.appState.get("name");
      }
      this.loadBloggerNews();
    });
   }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

  /**
   * [loadBloggerNews 加载新闻列表]
   */
   loadBloggerNews(){
    this.newsService.getBloggerNews().subscribe(data => {
      console.log('getBloggerNews:',data.data);
      this.news=data.data;
    },
    err => {
        if(err.status == 401){ // 登录过期
          this.appState.clearLocalStorage();
          this.hasNotLogin = true;
          this.name = "";
        }
        console.log('xxxx',err);
     }
    );
  }

  /**
   * [toggleNewsState 设置阅读状态]
   * @param  {[Object]} p [新闻Model]
   */
  toggleNewsState(p){
    var that = this;
    setTimeout(function(){
      p.hasRead = !p.hasRead;
      that.newsService.toggleReadState(p._id, p.hasRead).subscribe(data => {
        console.log('toggleNewsState:',data.data);
      })
    },10);
  }
}
