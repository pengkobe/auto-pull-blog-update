import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { BloggerService } from '../_service/blogger';
import { NewsService } from '../_service/news';
import { XLarge } from './x-large';
import { MdDialog,MdDialogRef } from '@angular/material';
import { LoginDialogComponent } from './login';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    BloggerService,
    NewsService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./home.component.css'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent {
  news = [
    {
      _id:'345423423423423',
      from: {name : 'test',_id:''},
      title: 'test title',
      publishTime: new Date('1/1/16'),
      hasRead:false
    },
  ];
  // Set our default values
  localState = { value: '' };
  token = null;
  // TypeScript public modifiers
  constructor(public appState: AppState,
    public bloggerservice: BloggerService,public newsService :NewsService,public dialog: MdDialog) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    this.loadBloggerNews();
  }

  openLoginDialog(){
    let dialogRef = this.dialog.open(LoginDialogComponent);
   }

  submitState(value: string) {
    console.log('submitState', value);
    this.appState.set('value', value);
    this.localState.value = '';
  }

   loadBloggerNews(){
    this.bloggerservice.getBloggerNews().subscribe(data => {
      console.log('getBloggerNews:',data.data);
      this.news=data.data;
    });
  }

  /*
   * 设置 已读/未读
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
