import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  userOnLine!: any;
  profil: boolean = true;
  colorParam!: any;
  colorApercu: any = "#4CAF50";
  constructor() { }

  ngOnInit(): void {
    this.userOnLine = JSON.parse(localStorage.getItem('userOnline') || '');
    console.log(this.userOnLine);
  }
  switch() {
    this.profil = true;
    this.colorApercu = "#4CAF50";
    this.colorParam = "#000";
  }
  switch2() {
    this.profil = false;
    this.colorApercu = "#000";
    this.colorParam = "#4CAF50";
  }
}
