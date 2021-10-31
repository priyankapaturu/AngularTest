import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  comments:any;
  isContentLoading:boolean=false;

  constructor(private http: HttpClient) { }

  /**
   * loadPostCommentsByPostId function helps to get a post comments by accepting postId as parameter
   * @param postId 
   */
  loadPostCommentsByPostId(postId:number){
    this.isContentLoading=true;
    var url="https://jsonplaceholder.typicode.com/posts/"+postId+"/comments";
    this.http.get(url).subscribe(data => {
      this.comments=data;
      this.isContentLoading=false;
    });
  }

  ngOnInit(): void {
  }

  //map the attributes that are comming from this directive.
 @Input() postObj: any;

}
