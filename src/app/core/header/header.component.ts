import { Component, OnInit } from '@angular/core';
import { LinkDataService } from 'src/app/services/lien/link-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color!: string;

  constructor(
    private link_data : LinkDataService
  ) { }

  ngOnInit(): void {
    // this.activerLien();
    // alert(this.baseUrl)
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

  // baseUrl = this.link_data.url().subscribe(
  //   response => {}
  // )
  
  changeColor(id: any) {
    this.link_data.changeColor(id).subscribe(
      response => {
        alert(response);
      }
    )
  }
}
