import { Component } from '@angular/core';

import { AppState } from '../app.service';
import { BloggerService } from '../_service/blogger';
import { NewsService } from '../_service/news';
import { Title } from './title';
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
    Title,
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
      from: {name : 'test'},
      title: 'test title',
      publishTime: new Date('1/1/16'),
      hasRead:false
    },
  ];
  // Set our default values
  localState = { value: '' };
  token = null;
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title,
    public bloggerservice: BloggerService,public newsService :NewsService,public dialog: MdDialog) {
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => {
    //   this.token = data.data.token;
    //   console.log(data.data.token);
    //   this.title.getBloggerNews(this.token).subscribe(bloggernews => {
    //     console.log(bloggernews);
    //   });
    // });
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
   切换阅读状态
   */
  toggleNewsState(p){
    p.hasRead = !p.hasRead;
    // 切换状态
    // for (var i = 0; i < this.news.length; i++) {
    //   if(this.news[i].from._id == p.from._id){
    //     this.news[i].hasRead = !p.hasRead;
    //   }
    // }
    this.newsService.toggleReadState(p.from._id, p.hasRead).subscribe(data => {
      console.log('toggleNewsState:',data.data);
    })
  }
}
