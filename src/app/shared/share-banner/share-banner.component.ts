import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-banner',
  templateUrl: './share-banner.component.html',
  styleUrls: ['./share-banner.component.scss']
})
export class ShareBannerComponent implements OnInit {
  position!: any;
  displayButtonSroll: boolean = true;
  ngOnInit(): void {
    this.position = location.href.substring(location.href.lastIndexOf('/') + 1);
    if (this.position == 'espace-verte') {
      this.position = 'Espace verte'
    }
    if (window.scrollY > 200) {
      this.displayButtonSroll = false;
    } else {
      this.displayButtonSroll = true;
    }
  }
  scroller() {
    window.scrollTo(0, 260);
  }
}
