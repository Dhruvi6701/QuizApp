import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  msg: any = [];
  public users: any[];
  avail: boolean;

  public loading: any = true;
  public empty: any = true;
  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true
    this.empty = true
    this.getdata();
  }

  getdata() {
    this.adminService.seestudent()
      .subscribe(
        data => {
          if (data['user']) {
            this.users = data['user']
            this.loading = false
            if (!this.users.length) {
              this.empty = true;
            }
            else {
              this.empty = false;
            }
          }
        },
        error => {
          this.router.navigate(['/error']);
        }


      )

  }

  block(user) {
    var userid = user._id;
    this.adminService.blockuser(userid).subscribe(
      data => {
        this.getdata()
        // this.router.navigate(['/admin/adminhome']);
      },
      (error) => {


        this.router.navigate(['/error']);
      }
    )
  }

  unblock(user) {
    var userid = user._id;
    this.adminService.unblockuser(userid).subscribe(
      data => {
        this.getdata()
        // this.router.navigate(['/admin/adminhome']);
      },
      (error) => {
        this.router.navigate(['/error']);
      }
    )
  }

}
