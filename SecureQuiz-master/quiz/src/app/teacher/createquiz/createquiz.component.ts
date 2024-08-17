import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teacher.service';

class CreateQuiz {
  quizname: string;
  quizdescription: string;
  upload: boolean;
  owneremail: string;
}

@Component({
  selector: 'app-createquiz',
  templateUrl: './createquiz.component.html',
  styleUrls: ['./createquiz.component.css']
})
export class CreatequizComponent implements OnInit {

  constructor(private teacherService: TeacherService, private router: Router) { }
  msg: any = [];
  avail: boolean;
  ngOnInit(): void {
  }

  createquiz(f: NgForm) {
    const saveModel = new CreateQuiz()
    saveModel.quizname = f.value.quizname;
    saveModel.quizdescription = f.value.quizdescription;
    saveModel.owneremail = localStorage.getItem('userid');


    this.teacherService.createquiz(saveModel)
      .subscribe(
        data => {
          if (data['msg']) {
            this.msg = data['msg'];
            this.avail = true;
            return;
          }
          this.router.navigate(['/teacher/uploadquiz']);
        },
        error => {
          this.router.navigate(['/error']);
        }

      )
  }
}
