import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkDataService } from 'src/app/services/lien/link-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color!: string;
  userOnLine!: any;
  change: boolean = false;

  constructor(
    private link_data: LinkDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '');
  }

  sidebar_data = this.link_data.sidebar_data;

  sidebar_cta = [
    {
      icon: "fa-solid fa-magnifying-glass"
    },
    {
      icon: "fa-regular fa-user"
    }
  ]

  derouler() {
    let a = document.getElementById("deroule");
    this.change = !this.change;
    if (!this.change) {
      a!.style.rotate = '0deg';
    } else {
      a!.style.rotate = '180deg';
    }
  }
  redirectToEspace() {
    this.router.navigate(['../user/espace-creatif', this.userOnLine.id]);
  }

  changeColor(id: any) {
    this.link_data.changeColor(id).subscribe(
      response => {
        alert(response);
      }
    )
  }
}
