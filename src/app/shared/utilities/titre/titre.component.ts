import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titre',
  templateUrl: './titre.component.html',
  styleUrls: ['./titre.component.scss']
})
export class TitreComponent implements OnInit {
  @Input() color_one: string = "#fff"; 
  @Input() color_two: string = "#4CAF50";  
  @Input() sus_titre !: string;
  @Input() titre !: string;
  
  two_fisrt !: any;
  ngOnInit(): void {
    this.two_fisrt = this.titre.substring(0, 2);
  }
}
