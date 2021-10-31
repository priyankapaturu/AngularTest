import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit {

  constructor(private http: HttpClient) { }

  userList: any;
  userPosts: any = [];

  //Init properties
  howManyPostToLoadInitially:number=3; //to load minimum user posts
  showLoadMoreBtn:boolean=false; //desides whther to show Load More button
  isContentLoading:boolean=false; //To show loading animation

  /**
   * getUserPostsById function helps to get an User posts and assign data to userPosts property
   * 
   * @param userId 
   * 
   */
  getUserPostsById(userId: Number) {

    //Reset global properties
    this.howManyPostToLoadInitially=3;
    this.isContentLoading=true;

    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe(data => {
      var userPosts = Object.values(data).filter(function (post) {
        return post.userId == userId;
      })

      this.userPosts = userPosts;
      this.showLoadMoreBtn=true;
      this.isContentLoading=false;
    });

  }

  /**
   * loadMorePosts function helps to set howManyPostToLoadInitially propety to set its max value 
   * so that all the post of an User will appear.
   */
  loadMorePosts(){
    this.howManyPostToLoadInitially=this.userPosts.length;
    this.showLoadMoreBtn=false;
  }

  //On Rendering the page, the ajax call get the list of Users.
  ngOnInit(): void {
    this.http.get("https://jsonplaceholder.typicode.com/users").subscribe(data => {
      this.userList = data;
    });
  }

}
