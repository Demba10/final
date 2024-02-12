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

  constructor(
    private link_data: LinkDataService,
    private userService: UsersService,
    private sharedeService: SharedService
  ) { }
  ngOnInit(): void {

  }
  inscriptionNewletters() {
    this.userService.newlatters(this.email).subscribe(
      res => {
        // console.log(res)
        this.sharedeService.alert('', 'Inscription au newllaters réussie!', 'success');
        this.email = '';
      }
    );
  }
}
