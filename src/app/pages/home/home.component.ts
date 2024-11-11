import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private authService:AuthService){}
  ngOnInit(){
    if(this.authService.isLoggedIn()){
      this.authService.logout()
    }
  }
}
