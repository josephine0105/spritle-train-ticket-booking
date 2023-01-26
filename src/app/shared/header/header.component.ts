import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  login:any;
  roles:any
  constructor(public _authService: AuthService) {}

  ngOnInit(): void {
    let data=this._authService.sessionGetItem('is_logged')
    this.login=data;
    let role=localStorage.getItem('is_role')
    this.roles=role;
    console.log(this.roles)

  }
  logout() {}
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
