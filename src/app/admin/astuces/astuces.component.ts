import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AstucesService } from 'src/app/services/conseils/astuces.service';

@Component({
  selector: 'app-astuces',
  templateUrl: './astuces.component.html',
  styleUrls: ['./astuces.component.scss']
})
export class AstucesComponent {
  filtre: boolean = true;
  displayedColumns: string[] = ['#', 'image', 'user_name', 'like', 'comment', 'titre'];
  dataSource = new MatTableDataSource<any>(ASTUCES);
  constructor(
    private articles: AstucesService
  ) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource.data = this.articles.astuces;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    });
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