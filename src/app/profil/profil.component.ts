import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  userOnLine!: any;
  profil: boolean = true;
  constructor() { }

  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '') ;
    console.log(this.userOnLine);
  }
  switch() {
    this.profil = !this.profil;
  }
}
