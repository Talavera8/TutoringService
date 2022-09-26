import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Request } from '../requestModel';
import { TutoringRequestsService } from '../tutoring-requests.service';

@Component({
  selector: 'app-tutoring-request-list',
  templateUrl: './tutoring-request-list.component.html',
  styleUrls: ['./tutoring-request-list.component.css']
})
export class TutoringRequestListComponent implements OnInit {

  constructor(private requestsService: TutoringRequestsService, private router: Router, private authService: AuthService) { }

  requests!: Request[];
  userType!: string;

  ngOnInit(): void {
    this.requestsService.getAllTutoringRequests().subscribe(response => {
      this.requests = response.requests;
    });
    this.userType = this.authService.getUserType();
  }

  editRequest(request: Request) {
    this.router.navigate(['/editRequest', request.requestId]);
  }

  deleteRequest(id: number) {
    this.requestsService.deleteRequest(id).subscribe(response => {
      console.log(response.message);
      this.requestsService.getAllTutoringRequests().subscribe(response => {
        this.requests = response.requests;
      });
    });
  }

}
