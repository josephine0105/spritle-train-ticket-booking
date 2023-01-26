import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    // public _service:ServiceService,
    public router:Router) { }

  ngOnInit(): void {
  }
  goback(){
    // if(this._service.isAuthenticated()){
    //   this.router.navigate(['/home'])
    // }
    // else{
      this.router.navigate(['/'])
    // }
  }
}
