import { Token } from '@angular/compiler';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(
    private link_data: LinkDataService,
    private router: Router,
    private sharedService: SharedService
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
  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }

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

  deconnexon() {
    this.sharedService.alert('success', 'Déconnexion réussie', 'success');
    this.router.navigate(['/auth']);
    localStorage.setItem('userOnline', '');
    localStorage.setItem('token', '');
  }
}
