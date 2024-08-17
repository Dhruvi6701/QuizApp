import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  msg: any = [];
  avail: boolean;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onSubmitForgot(f: NgForm) {
    // console.log("f submit");
    console.log(f.value);
    
    this.authService.resetpassword(JSON.stringify(f.value))
      .subscribe(
        data => {
          // console.log(data);
          if (data['message']) {
            this.msg = data['message'];
            this.avail = true;
            this.router.navigate(['/']);
            return;
          }
          else {
            this.router.navigate(['/reset-password']);
          }

        },
        error => {
          this.router.navigate(['/error']);
        }
      )
  }
}
