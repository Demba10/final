import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-espace-creatif',
  templateUrl: './espace-creatif.component.html',
  styleUrls: ['./espace-creatif.component.scss']
})
export class EspaceCreatifComponent implements OnInit {

  userOnline!: any;
  produits!: any[];

  constructor(
    private produitService: ProduitsService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('user') || '[]');
    console.log(this.userOnline);
    this.lister();
  }

  lister() {
    this.userService.getProduits().subscribe(
      response => {
        console.log(response);
        this.produits = response;
      }
    )
  }
}
