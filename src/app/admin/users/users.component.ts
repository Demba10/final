import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Jardinier } from 'src/app/modele/jardiner.modele';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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

  constructor(
    private userServices: UsersService,
    private sharedService: SharedService
  ) { }

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

  mergedUsers: any[] = [];
  merger() {
    this.userServices.getJardiniers().subscribe(jardiniers => {
      this.mergedUsers = this.mergedUsers.concat(jardiniers);

      this.userServices.getClients().subscribe(clients => {
        this.mergedUsers = this.mergedUsers.concat(clients);
        // console.log(this.mergedUsers);
        this.dataSource.data = this.mergedUsers;
        console.log(this.dataSource.data);

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
          }
        )
      }
    })
  }
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
    this.merger();
  }
}