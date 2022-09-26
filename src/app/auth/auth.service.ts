import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './userModel';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  private userId!: number;
  private userType!: string;
  private isAuthenticated: boolean = false;
  private authStatusListener = new Subject<boolean>();

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getUserType() {
    return this.userType;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  constructor(private http: HttpClient, private router: Router) { }

  createUser(formValue: {userType: string, firstName: string, lastName: string, city: string, email: string, password: string, hourlyRate: number, subject: string[], profilePhoto: string, biography: string}) {
    this.http.post<{ message: string, user: User }>("http://localhost:3000/users", formValue).subscribe(response => {
      console.log(response.message);
      this.router.navigate(["/tutors"]);
    // we can subscribe here in the signup form because tutorsList gets re-initiated when we leave the signup form and go to the tutorsList
    // have to navigate to tutorsList from here, since here is where we subscribe after creating user
    });
  }

  login(formValue: {email: string, password: string}) {
    this.http.post<{message: string, token: any, userId: number, userType: string, expiresIn: number}>("http://localhost:3000/users/login", formValue).subscribe(response => {
      this.token = response.token;
      this.userId = response.userId;
      this.userType = response.userType;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      console.log(response);
      if(this.userType === 'tutor') {
        this.router.navigate(["/requestsView"]);
      }
      if(this.userType === 'student') {
        this.router.navigate(['/tutors']);
      }
    })
  }

  getAllUsers() {
    return this.http.get<{users: User[]}>("http://localhost:3000/users");
    // since we need all users in tutorsList, subscribe in tutorsList
  }

  getUser(userId: number) {
    return this.http.get<{message: string, user: User}>(`http://localhost:3000/users/${userId}`);
  }

  editUser(user: User) {
    this.http.patch<{message: string, user: User}>(`http://localhost:3000/users/${user.userId}`, user).subscribe(response => {
      console.log(response);
      this.router.navigate(["/tutors"]);
    });
  }

  deleteUser(userId: number) {
    return this.http.delete<{message: string}>(`http://localhost:3000/users/${userId}`);
    // since deleteUser is clicked from tutorList, and therefore, tutorList doesn't get re-initiated, we need to subscribe there
  }

  logout() {
    this.token = "";
    this.userId = -1;
    this.userType = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    console.log("User has been logged out");
    console.log("this.token:");
    console.log(this.token);
    this.router.navigate(["/"]);
  }
}
