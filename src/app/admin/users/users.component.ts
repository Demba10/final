import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
 
const ELEMENT_DATA = [
  {
    id: 1,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Mansour Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 2,
    image: 'assets/images/jardinier/jardinier-2.png',
    nom: 'Ibrahima Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 3,
    image: 'assets/images/jardinier/jardinier-3.png',
    nom: 'Aboubacar Diop',
    lien: '',
    adresse: 'Mbour',
    produits: 11
  },
  {
    id: 4,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Pape Matar Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 9
  },
  {
    id: 5,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Mansour Sall',
    lien: '',
    adresse: 'Mbour',
  },
  {
    id: 6,
    image: 'assets/images/jardinier/jardinier-2.png',
    nom: 'Ibrahima Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 7,
    image: 'assets/images/jardinier/jardinier-3.png',
    nom: 'Aboubacar Diop',
    lien: '',
    adresse: 'Mbour',
    produits: 11
  },
  {
    id: 8,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Pape Matar Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 9
  },
  {
    id: 9,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Mansour Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 10,
    image: 'assets/images/jardinier/jardinier-2.png',
    nom: 'Ibrahima Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 11,
    image: 'assets/images/jardinier/jardinier-3.png',
    nom: 'Aboubacar Diop',
    lien: '',
    adresse: 'Mbour',
    produits: 11
  },
  {
    id: 12,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Pape Matar Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 9
  },
  {
    id: 13,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Mansour Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 14,
    image: 'assets/images/jardinier/jardinier-2.png',
    nom: 'Ibrahima Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 15
  },
  {
    id: 15,
    image: 'assets/images/jardinier/jardinier-3.png',
    nom: 'Aboubacar Diop',
    lien: '',
    adresse: 'Mbour',
    produits: 11
  },
  {
    id: 16,
    image: 'assets/images/jardinier/jardinier-1.png',
    nom: 'Pape Matar Sall',
    lien: '',
    adresse: 'Mbour',
    produits: 9
  },
]
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private modalService = inject(NgbModal);
  displayedColumns: string[] = ['#', 'utilisateur', 'email', 'création', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'lg' });
  }
  openAdd(add: TemplateRef<any>) {
    this.modalService.open(add, { size: 'lg' });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
  }
}