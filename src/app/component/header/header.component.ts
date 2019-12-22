import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  minutes: number = 0;
  seconds: number = 0;
  bombs: number = 10;
  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.seconds += 1;
      if(this.seconds == 60){
        this.minutes += 1;
        this.seconds = 0;
      }
    }, 1000);
  }

}
