import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { JardiniersService } from 'src/app/services/jardniers/jardiniers.service';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-jardinoteque',
  templateUrl: './jardinoteque.component.html',
  styleUrls: ['./jardinoteque.component.scss']
})
export class JardinotequeComponent implements OnInit {
  jardiniers!: any[];
  jardinier!: any;
  jar: any;
  jar_id!: any;
  private modalService = inject(NgbModal);
  other!: any[];
  searchTerm: any;
  sms: any;
  smsLast: any;
  mes!: any[];
  userOnline: any;
  currentId: any;
  websocket: boolean = false;
  intervalId: any;
  constructor(
    // private jardiniers: JardiniersService,
    private userService: UsersService,
    private messagerie: MessagerieService
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
    this.jar_id = localStorage.getItem('id_jar');
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.currentId = this.userOnline.id;
  }

  openXl(content: TemplateRef<any>, id: any) {
    this.modalService.open(content, { size: 'xl', scrollable: true });
    localStorage.setItem('id_jar', (id));
    this.jar_id = localStorage.getItem('id_jar');
    this.jar = this.jardiniers.find(ele => ele.id == this.jar_id);
  }

  // Les messages
  openVerticallyCentered(content: TemplateRef<any>) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }
  listerMesages(id: any) {
    this.messagerie.recuperMessageParId(id).subscribe(
      response => {
        this.mes = response.message;
        this.mes = this.mes.filter(ele => (ele.envoyeur_id == this.jar_id || ele.receveur_id == this.jar_id));
        this.websocket = true;
        console.log(this.mes);
      }
    )
  }
  sendMessage() {
    const contenue = this.sms;
    this.messagerie.envyerMessage(this.jar_id, contenue).subscribe(
      response => {
        console.log(response);
        this.smsLast = response.data.contenue
        this.sms = '';
        this.listerMesages(this.userOnline.id);
      },
      error => {
        console.log(error);
      }
    )
  }
  // Fin des messages
  consulterProfil(id: any) {
    this.userService.getProfil(id).subscribe(
      response => {
        // console.log(response);
        // this.jar_id = localStorage.setItem('id_jar', id);
      }
    )
  }
  listerJardiniers() {
    this.userService.getJardiniers().subscribe(
      response => {
        this.jardiniers = response;
        this.jardiniers = this.jardiniers.filter(ele => ele.is_bloquer == 0);
        this.other = this.jardiniers.filter(ele => ele.is_bloquer == 0);
        console.log(this.jardiniers);
        // this.jar = this.jardiniers.find(ele => ele.id == this.jar_id);

        // this.jardinier = this.jardiniers.find(ele => ele.id == this.jar_id)
        // console.log(this.jardiniers);
      }
    )
  }
  filterItems() {
    this.jardiniers = this.other;
    this.jardiniers = this.other.filter(
      ele => ele.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) || ele.nom.toLowerCase().includes(this.searchTerm) || ele.created_at.includes(this.searchTerm));
  }

  ngAfterViewInit() {
    this.listerJardiniers();
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