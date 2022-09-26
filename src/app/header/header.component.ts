import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isAuthenticated = false;
  authListenerSubscription!: Subscription;
  userType!: string;

  ngOnInit(): void {
    this.authListenerSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.userType = this.authService.getUserType();
  }

  logOut() {
    this.authService.logout();
  }

}
