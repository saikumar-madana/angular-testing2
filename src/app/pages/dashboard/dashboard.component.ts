import { Component, OnInit } from '@angular/core';
import { HttpPayload, HttpService } from 'src/app/common/services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  users = [];

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.getDashboardUsers();
  }

  getDashboardUsers(): void {
    const req: HttpPayload = {
      url: 'users',
      method: 'get'
    };
    this.http.callApi(req).subscribe((res) => {
      console.log(res, 'reponsesesse');
      this.users = res.data;
    });
  }

}
