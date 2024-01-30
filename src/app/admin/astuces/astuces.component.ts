import { Component, TemplateRef, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/modele/article.modele';
import { ArticlesService } from 'src/app/services/articles.service';
import { AstucesService } from 'src/app/services/conseils/astuces.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-astuces',
  templateUrl: './astuces.component.html',
  styleUrls: ['./astuces.component.scss']
})
export class AstucesComponent {

  // Form data 

  private modalService = inject(NgbModal);
  filtre: boolean = true;
  displayedColumns: string[] = ['#', 'image', 'user_name', 'like', 'comment', 'titre'];
  dataSource = new MatTableDataSource<any>(ASTUCES);
  articleSliste!: any[];

  // Les propriétés
  titre!: string;
  image!: any;
  contenu!: string;
  
  extractTitle() : string {
    let a = this.contenu.indexOf('<')
    return this.contenu.charAt(a);
  }
  // 
  constructor(
    private articles: AstucesService,
    private art: ArticlesService,
  ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngOnInit(): void {
    this.dataSource.data = this.articles.astuces;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
    this.listeArticles();
    this.titre = this.contenu;
  }
  // Issue des service
  
  listeArticles() {
    this.art.getArticles().subscribe(
      resoponse => {
        this.articleSliste = resoponse;
        console.log(resoponse);
        
      }
    )
  }

  ajouterArticle() {

    let formData = new FormData();
    formData.append("image", this.image); 

    let t = this.contenu.indexOf('>');
    let l = this.contenu.substring(t).indexOf('<')
    let k = this.contenu.substring(t).indexOf('>')

    const nouvelArticle: Article = {
      titre: this.contenu.substring(t+1, l-1),
      image: "chemin/vers/l/image.png",
      contenue: this.contenu
    };

    this.art.createArticle(nouvelArticle).subscribe(
      response => {
        alert(t)
        this.articleSliste.push(nouvelArticle);
        console.log(response);
        Swal.fire({
          title: 'Success',
          text: response.message,
          icon: 'success'
        })
      }
    )
  }
  getFile(event: any) {
    console.warn(event.target.files[0]);
    this.image = event.target.files[0] as File;
  }

  openXl(content: TemplateRef<any>) {
    this.modalService.open(content, { size: 'xl' });
  }

  filtrer() {
    this.filtre = !this.filtre;
  }
}
export interface Astuces {
  id: number,
  user_name: string,
  image: string,
  titre: string,
  date: string,
  like: number,
  message: number,
  user_image: string,
  sous_titre: string
}

const ASTUCES: Astuces[] = [
  {
    id: 1,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-1.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 2,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-2.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 3,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-3.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 4,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-4.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 5,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-5.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    id: 6,
    user_name: 'Jean Basse',
    image: 'assets/images/conseils/conseil-6.png',
    titre: 'Comment mettre en valeur vos compétences en jardinage',
    date: '12 Sep 2023',
    like: 3,
    message: 6,
    user_image: "https://img.freepik.com/photos-gratuite/casual-jeune-homme-africain-souriant-isole-blanc_93675-128895.jpg?size=626&ext=jpg&ga=GA1.1.735943258.1704851612&semt=ais",
    sous_titre: "Lorem ipsum dolor sit amet consectetur."
  },
]