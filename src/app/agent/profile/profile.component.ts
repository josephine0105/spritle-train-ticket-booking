import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: any=[];
  data:any=[]
  constructor(public _authService: AuthService) {}

  ngOnInit(): void {
    this.data = (localStorage.getItem('currentUser'));
    // this.data=JSON.parse(this.userProfile)
    this.userProfile.push(JSON.parse(this.data))
    console.log(this.data);
  }
}
