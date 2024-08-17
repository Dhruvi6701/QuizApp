import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public avail: boolean = false;
  private quizid: any;
  public msg: string = "";
  private baseUri: string = "http://localhost:3000/student/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  getAllQuiz() {
    const upload = true;
    return this.http.get(this.baseUri + "getallquiz?upload="+upload, { headers: this.headers });
  }

  setQuizId(id) {
    this.quizid = id;
  }

  getQuizId() {
    return this.quizid;
  }
  
  getAllQuestion(id) {
    return this.http.get(this.baseUri + "getallquestion?quizid=" + id, { headers: this.headers });
  }

  block()
  {
    const email = localStorage.getItem('userid');
    return this.http.put(this.baseUri + "blockme?userId="+email, {}, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
