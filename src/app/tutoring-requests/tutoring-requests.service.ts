import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from './requestModel';

@Injectable({
  providedIn: 'root'
})
export class TutoringRequestsService {

  constructor(private http: HttpClient, private router: Router) { }

  createRequest(formObj: {date: Date, firstName: string, lastName: string, city: string, subject: string, timeFrame: string, availability: string[]}) {
    this.http.post<{request: Request}>("http://localhost:3000/requests", formObj).subscribe(response => {
      this.router.navigate(['/requestsView']);
    });
  }

  getAllTutoringRequests() {
    return this.http.get<{requests: Request[]}>("http://localhost:3000/requests");
  }

  getRequestById(id: number) {
    return this.http.get<{request: Request[]}>(`http://localhost:3000/requests/${id}`);
  }

  editRequest(request: Request) {
    this.http.patch<{message: string}>(`http://localhost:3000/requests/${request.requestId}`, request).subscribe(response => {
    this.router.navigate(['/requestsView']);
    });
  }

  deleteRequest(id: number) {
    return this.http.delete<{message: string}>(`http://localhost:3000/requests/${id}`);
  }
}
