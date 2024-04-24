import { Component } from '@angular/core';
import { Banner } from 'src/app/models/Banner';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  banners: Banner[] = [];

  constructor(private http: HttpClientService) {}

  ngOnInit() {
    this.http.get<Banner[]>(`bannerReadAll`, (res) => {
      this.banners = res;
    });
  }
}
