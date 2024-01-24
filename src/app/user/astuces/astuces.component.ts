import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AstucesService } from 'src/app/services/conseils/astuces.service';

@Component({
  selector: 'app-astuces',
  templateUrl: './astuces.component.html',
  styleUrls: ['./astuces.component.scss']
})
export class AstucesComponent implements OnInit {

  mesAstuces = this.astuces.astuces;
  astuce = this.mesAstuces.find(ele => ele.id == 1);
  private offcanvasService = inject(NgbOffcanvas);

  constructor(
    private astuces: AstucesService
  ) { }
  ngOnInit(): void {
    // this.astuce = this.oneArticle;
  }
  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }
}
