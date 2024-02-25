import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'florsen';

  constructor(
    private router: Router,
    private sharedService: SharedService
  ) { }

  isAuth!: any;
  time!: number;

  ngOnInit(): void {
    this.time = JSON.parse(localStorage.getItem('time') || '');
    this.increment();
  }

  increment() {
    setInterval(() => {
      this.time--;
      localStorage.setItem('time', JSON.stringify(this.time))
      if (this.time == 0) {
        if (localStorage.getItem('token')) {
          localStorage.removeItem('userOnline');
          localStorage.removeItem('token');
          this.sharedService.alert('Oops', 'Token expiré! Veuillez vous reconnectez.', 'warn')
          this.router.navigate(['/auth']);
        }
        this.time = 90;
      }
    }, 100 * 60 * 60);
  }
}