import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  minutes: number = 0;
  seconds: number = 0;
  bombs: number;
  constructor(private service: MainService) { }

  ngOnInit() {

    this.service.dataObservable.subscribe((data) => {
      this.bombs = data.bomb;
    });

    setInterval(() => {
      this.seconds += 1;
      if(this.seconds == 60){
        this.minutes += 1;
        this.seconds = 0;
      }
    }, 1000);
  }

}
