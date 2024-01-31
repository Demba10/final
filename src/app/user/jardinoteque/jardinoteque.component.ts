import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JardiniersService } from 'src/app/services/jardniers/jardiniers.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-jardinoteque',
  templateUrl: './jardinoteque.component.html',
  styleUrls: ['./jardinoteque.component.scss']
})
export class JardinotequeComponent implements OnInit {
  jardiniers!: any[];
  constructor(
    // private jardiniers: JardiniersService,
    private userService: UsersService
  ) { }
  
  displayedColumns: string[] = ['id', 'image', 'nom', 'lien', 'adresse', 'produits'];
  dataSource = new MatTableDataSource<Jardinier>(jardinier);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngOnInit(): void {
    this.dataSource.data = jardinier;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    this.listerJardiniers();  
  }
  
  listerJardiniers() {
    this.userService.getJardiniers().subscribe(
      response => {
        this.jardiniers = response;
        console.log(this.jardiniers);
      }
    )
  }
  
  ngAfterViewInit() {
    
  }
}
 
export interface Jardinier {
  id: number;
  image: string;
  nom: string;
  lien: string;
  adresse: string;
  produits: number;
}

const jardinier: Jardinier[] = [
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
    produits: 15
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