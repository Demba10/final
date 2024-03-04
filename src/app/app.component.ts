import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { UsersService } from './services/users.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'florsen';

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private userService: UsersService,
    private tokenService: TokenService
  ) { }

  isAuth!: any;
  time!: number;

  ngOnInit(): void {
    this.time = JSON.parse(localStorage.getItem('time') || '');
    this.increment();
  }

  reconnecter() {
    this.userService.refreshUser().subscribe(
      resp => {
        this.tokenService.saveToken(resp.authorisation.token);
      }
    )
  }

  increment() {
    let startTime = parseInt(localStorage.getItem('startTime') || '0');
    if (startTime === 0) {
      startTime = Math.floor(Date.now() / 1000);
      localStorage.setItem('startTime', startTime.toString());
    }

    setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - startTime;
      const remainingTime = 2700 - elapsedTime;

      if (remainingTime <= 0) {
        if (localStorage.getItem('token')) {
          // localStorage.removeItem('startTime');
          // localStorage.removeItem('userOnline');
          // localStorage.removeItem('token');
          // this.sharedService.alert('Oops', 'Token expiré! Veuillez vous reconnecter.', 'warn');
          // this.router.navigate(['/auth']);
          this.reconnecter();
        }
      } else {
        this.time = remainingTime;
        localStorage.setItem('time', JSON.stringify(this.time));
      }
    }, 1000 * 45 * 60);
  }
}