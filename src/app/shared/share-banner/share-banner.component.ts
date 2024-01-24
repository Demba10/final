import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-share-banner',
  templateUrl: './share-banner.component.html',
  styleUrls: ['./share-banner.component.scss']
})
export class ShareBannerComponent implements OnInit {
  position!: any;
  ngOnInit(): void {
    this.position = location.href.substring(location.href.lastIndexOf('/') + 1);
    if (this.position == 'espace-verte') {
      this.position = 'Espcace verte'
    }
  }
}
