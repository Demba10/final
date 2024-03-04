import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Jardinier } from 'src/app/modele/jardiner.modele';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { ProduitsService } from 'src/app/services/produits.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface Jardniier {
  id: number,
  prenom: string,
  nom: string,
  email: string,
  telephone: string,
  adresse: string,
  image: string,
  email_verified_at: number,
  is_bloquer: number,
  role: string,
  updated_at: string,
  created_at: string,
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private modalService = inject(NgbModal);
  displayedColumns: string[] = ['#', 'utilisateur', 'adresse', 'email', 'création', 'action'];
  users!: Jardinier[];
  dataSource = new MatTableDataSource<Jardinier>();
  prod!: any[];
  long!: number;

  constructor(
    private userServices: UsersService,
    private sharedService: SharedService,
    private produitServce: ProduitsService
    // private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.userServices.getJardiniers().subscribe(
      response => {
        this.users = response;
        console.log(this.users);
        this.dataSource.data = this.users;
      }
    )
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 1000);
    this.listerUsers2();
    // this.merger();
    this.allUser();
    this.listerProduits();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openLg(content: TemplateRef<any>, id?: any) {
    this.modalService.open(content, { size: 'lg' })
    if (id) {
      this.userServices.getProduits().subscribe(
        response => {
          this.prod = response;
          // console.log(this.prod);
          this.prod = this.prod.filter(p => {
            p.user_id == id;
            this.long = this.prod.length;
          })
        }
      );
    }
  }
  openAdd(add: TemplateRef<any>) {
    this.modalService.open(add, { size: 'lg' });
  }
  listerProduits() {
    // this.userServices.getProduits().subscribe(
    //   response => {
    //     // console.log(response);
    //     this.prod = response;
    //     console.log(this.prod);

    //   }
    // );
  }
  listerUsers() {
    this.userServices.getJardiniers().subscribe(
      response => {
        this.users = response;
        // console.log(this.users);
      }
    )
  }
  listerUsers2() {
    this.userServices.getClients().subscribe(
      response => {
        // console.log(response);
      }
    )
  }
  allUser() {
    this.userServices.allUser().subscribe(
      response => {
        console.log("All user ", response);
        this.dataSource.data = response.users;
      }
    )
  }
  userInactif() {
    this.userServices.allUser().subscribe(
      response => {
        console.log("All user ", response);
        this.dataSource.data = response.users;
        this.dataSource.data = this.dataSource.data.filter(u => u.is_bloquer == 1);
      }
    )
  }
  userActif() {
    this.userServices.allUser().subscribe(
      response => {
        console.log("All user ", response);
        this.dataSource.data = response.users;
        this.dataSource.data = this.dataSource.data.filter(u => u.is_bloquer == 0);
      }
    )
  }
  userJardinier() {
    this.userServices.allUser().subscribe(
      response => {
        console.log("All user ", response);
        this.dataSource.data = response.users;
        this.dataSource.data = this.dataSource.data.filter(u => u.role_id == 2);
      }
    )
  }
  userClient() {
    this.userServices.allUser().subscribe(
      response => {
        console.log("All user ", response);
        this.dataSource.data = response.users;
        this.dataSource.data = this.dataSource.data.filter(u => u.role_id == 3);
      }
    )
  }
  mergedUsers: any[] = [];
  merger() {
    this.userServices.getJardiniers().subscribe(jardiniers => {
      this.mergedUsers = this.mergedUsers.concat(jardiniers);

      this.userServices.getClients().subscribe(clients => {
        this.mergedUsers = this.mergedUsers.concat(clients);
        // console.log(this.mergedUsers);
        this.dataSource.data = this.mergedUsers;
        // console.log(this.dataSource.data);
      });
    });
  }

  blouerUser(id: any) {
    Swal.fire({
      title: "Etes-vous sure?",
      text: "Cet utilisateur sera bloqué!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, bloqué",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServices.bloquerUsers(id).subscribe(
          response => {
            // console.log(response);
            this.sharedService.alert('', response.Message, 'success');
            this.allUser();
          }
        )
      }
    })
  }
  debloquerUsers(id: any) {
    Swal.fire({
      title: "Etes-vous sure?",
      text: "Cet utilisateur sera débloqué!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, débloqué",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userServices.debloquerUsers(id).subscribe(
          response => {
            // console.log(response);
            this.sharedService.alert('', response.Message, 'success');
            this.allUser();
          }
        )
      }
    })
  }
}