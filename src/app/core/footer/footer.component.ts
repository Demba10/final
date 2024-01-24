import { Component } from '@angular/core';
import { LinkDataService } from 'src/app/services/lien/link-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private link_data: LinkDataService
  ) { }
  lien = this.link_data.sidebar_data
}
