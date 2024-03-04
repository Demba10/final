import { Component, OnInit } from '@angular/core';
import { LinkDataService } from 'src/app/services/lien/link-data.service';
import { SharedService } from 'src/app/services/shared.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  lien = this.link_data.sidebar_data;
  email!: any;
  val!: any;
  message!: string;

  constructor(
    private link_data: LinkDataService,
    private userService: UsersService,
    private sharedeService: SharedService
  ) { }
  ngOnInit(): void {

  }
  inscriptionNewletters() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!this.email || this.email == '') {
      this.message = "Vueillez remplir le champs!";
    } else if (!emailRegex.test(this.email)) {
      this.message = "Format email invalide!";
    } else if (emailRegex.test(this.email)) {
      this.userService.newlatters(this.email).subscribe(
        res => {
          this.sharedeService.alert('', 'Inscription au newllaters réussie!', 'success');
          this.email = '';
          this.message = '';
        }
      );
    }
    if (this.email = '') {
      this.message = '';
    }
  }
}
