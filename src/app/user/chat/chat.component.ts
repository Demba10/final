import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagerieService } from 'src/app/services/messagerie.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  private modalService = inject(NgbModal);
  mes!: any[];
  jar_id: any;
  websocket!: boolean;
  sms: any;
  smsLast: any;
  userOnline: any;
  showDetails!: boolean;
  jar!: any;
  jardiniers!: any[];
  currentId: any;

  constructor(
    private userService: UsersService,
    private messagerie: MessagerieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jar_id = localStorage.getItem('id_jar');
    this.userOnline = JSON.parse(localStorage.getItem('userOnline') || '[]');
    this.currentId = this.userOnline.id;
    this.listerMesages(this.userOnline.id);
  }

  openVerticallyCentered(content: TemplateRef<any>) {
    // this.modalService.open(content, { centered: true });
    this.modalService.open(content, { size: 'xl', scrollable: true });
  }
  openXl(content: TemplateRef<any>, id: any) {
    // this.modalService.open(content, { size: 'xl', scrollable: true });
    localStorage.setItem('id_jar', (id));
    this.jar_id = localStorage.getItem('id_jar');
    this.jar = this.jardiniers.find(ele => ele.id == this.jar_id);
  }
  voirDetail(id: any) {
    this.jar_id = localStorage.getItem('id_jar');
    this.jar = this.jardiniers.find(ele => ele.id == id);
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
  resterDetails() {
    this.showDetails = false;
  }

}
