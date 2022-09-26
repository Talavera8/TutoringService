import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/userModel';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css']
})
export class TutorListComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  users!: User[];
  userType!: string;

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe(response => {
      this.users = response.users.filter(u => u.userType == 'tutor');
    });
    this.userType = this.authService.getUserType();
  }

  editUser(user: User) {
    this.router.navigate(['/edit', user.userId]);
  }

  deleteUser(userId: number) {
    this.authService.deleteUser(userId).subscribe(response => {
      console.log('response after deleting user')
      console.log(response);
      this.authService.getAllUsers().subscribe(result => {
        this.users=result.users.filter(u => u.userType == 'tutor');
        console.log(`usersArray after deleting user with userId: ${userId}`);
        console.log(this.users);
      });
    });
  }

}
