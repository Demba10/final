import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  clients !: any[];
  constructor(
    private user: UsersService
  ) { }

  ngOnInit(): void {
    this.listeClient();
  }
  
  listeClient() {
    this.user.getClients().subscribe(
      response => {
        console.log(response);
      }
    )
  }
}