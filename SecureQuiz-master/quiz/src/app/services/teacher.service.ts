import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private quizid: any;
  private delete: any;
  public avail: boolean = false;
  public msg: string = "";
  private baseUri: string = "http://localhost:3000/teacher";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) { }

  createquiz(body: any) {
    return this.http.post(this.baseUri + "/createquiz", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getuploadquiz() {
    const email = localStorage.getItem('userid');
    const upload = false;
    return this.http.get(this.baseUri + "/getuploadquiz?owneremail=" + email + "&upload=" + upload, { headers: this.headers });
  }

  gethomequiz() {
    const email = localStorage.getItem('userid');
    return this.http.get(this.baseUri + "/gethomequiz?owneremail=" + email, { headers: this.headers });
  }

  seestudent() {
    return this.http.get(this.baseUri + "/seestudent", { headers: this.headers });
  }

  blockuser(id) {
    return this.http.delete(this.baseUri + "/blockuser/" + id, { headers: this.headers });
  }
  
  unblockuser(id) {
    return this.http.delete(this.baseUri + "/unblockuser/" + id, { headers: this.headers });
  }


  setQuizId(id) {
    this.quizid = id;
  }

  getQuizId() {
    return this.quizid;
  }

  deletequiz(body) {
    return this.http.delete(this.baseUri + "/deletequiz?_id="+body,  { headers: this.headers });
  }

  uploadquiz(body) {
    return this.http.post(this.baseUri + "/uploadquiz", { id: body }, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  
  addQuestion(body) {
    return this.http.post(this.baseUri + "/addquestion", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  getAllQuestion(id) {
    return this.http.get(this.baseUri + "/getallquestion?quizid="+id, { headers: this.headers });
  }

  deleteQuestion(id) {
    return this.http.delete(this.baseUri + "/deletequestion?questionId="+id, {headers: this.headers });
  }

  setDelete(data) {
    this.delete = data;
  }

  getDelete() {
    return this.delete;
  }
}
