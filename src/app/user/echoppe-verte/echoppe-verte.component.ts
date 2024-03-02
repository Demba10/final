import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageService } from 'src/app/services/image.service';
import { PaginationService } from 'src/app/services/pagination/pagination.service';
import { ProduitsService } from 'src/app/services/produits.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-echoppe-verte',
  templateUrl: './echoppe-verte.component.html',
  styleUrls: ['./echoppe-verte.component.scss']
})
export class EchoppeVerteComponent implements OnInit {

  produits!: any[];
  imageUrl!: any;
  other!: any[];
  searchTerm: any;
  detail!: any;
  userView!: any;
  View!: any[];

  // paginations 
  pager: any = {};
  itemsPerPage = 9;
  currentPage = 1;

  // paged items
  pagedItems!: any[];
  userOnline: any;
  produitPerUser!: any[];

  constructor(
    // private produits: ProduitsService,
    private produitService: ProduitsService,
    private imageService: ImageService,
    private pagerService: PaginationService,
    private userService: UsersService,
    private modalService: NgbModal,
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.listerProduits();
  }
  open(content: any) {
    this.modalService.open(content);
  }
  openLg(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
  openSm(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'md', scrollable: true });
  }
  filterItems() {
    this.produits = this.other;
    this.produits = this.other.filter(
      ele => ele.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) || ele.updated_at.includes(this.searchTerm));
  }
  listerProduits() {
    this.produitService.getProduits().subscribe(
      response => {
        console.log(response);
        this.produits = response;
        this.other = response;
      }
    )
  }

  //details
  lister() {
    this.userService.getProduits().subscribe(
      response => {
        // console.log(response);
        this.produits = response;
        // this.produits = this.produits.filter(ele => ele.user_id == Number(this.userOnline.id));
      }
    )
  }
  detailsProduit(id: any, userid?: any) {
    this.produitService.getproduitById(id).subscribe(
      response => {
        console.log(response);
        this.detail = response.article;
      }
    )
    this.userService.getJardiniers().subscribe(
      response => {
        this.View = response;
        this.userView = this.View.find(ele => ele.id == userid);
        console.log(this.userView);
        this.produitPerUser = this.produits.filter(ele => ele.user_id == userid)
      }
    )
  }

  // Pagination
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  get paginatedProduits(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.produits.slice(startIndex, endIndex);
  }
}