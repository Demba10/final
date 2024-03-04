import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private sharedService: SharedService,
    private router: Router
  ) { }

  deconnexon() {
    this.sharedService.alert('success', 'Déconnexion réussie', 'success');
    this.router.navigate(['../../auth']);
    localStorage.removeItem('userOnline');
    localStorage.removeItem('token');
  }
}
