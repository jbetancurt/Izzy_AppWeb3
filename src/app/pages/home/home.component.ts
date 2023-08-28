import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/components/login';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private loginService : LoginService,
    public router: Router
  ) { }

  ngOnInit(): void {
    if (!this.loginService.IsSingned()){
      this.router.navigate(['/login']);
    }
  }

}
