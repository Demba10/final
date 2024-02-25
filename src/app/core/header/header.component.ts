import { Token } from '@angular/compiler';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LinkDataService } from 'src/app/services/lien/link-data.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color!: string;
  userOnLine!: any;
  change: boolean = false;
  private modalService = inject(NgbModal);
  private offcanvasService = inject(NgbOffcanvas);
  existing: boolean = true;

  constructor(
    private link_data: LinkDataService,
    private router: Router,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '[]');
    if (localStorage.getItem('userOnline') == undefined || localStorage.getItem('userOnline') == null) {
      this.existing = false;
    } else {
      this.existing = true;
    }
  }

  adapter() {
    let a = document.getElementById('responsive');
    a!.style.transition = 'display 2s linear 2s';
    a!.style.display = 'block';
  }
  adapter2() {
    let a = document.getElementById('responsive');
    a!.style!.display = 'none';
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
  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }
  derouler() {
    let a = document.getElementById("deroule");
    let b = document.body;
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
  goLogin() {
  }
  deconnexon() {
    this.sharedService.alert('success', 'Déconnexion réussie', 'success');
    this.router.navigate(['/auth']);
    localStorage.removeItem('userOnline');
    localStorage.removeItem('token');
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
