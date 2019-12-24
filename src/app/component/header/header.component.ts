import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';
import { Data } from 'src/app/model/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  minutes: number = 0;
  seconds: number = 0;
  bombs: number = 0;
  data: Data = new Data();
  constructor(private service: MainService) { }

  ngOnInit() {
    this.service.dataObservable.subscribe((data) => {
      this.bombs = data.bomb - data.n_flag;
      this.data = data;
    });

    // Timer in header of the game
    setInterval(() => {
      if(this.data.gameOver){
        this.data.minutes = this.minutes;
        this.data.seconds = this.seconds;
        this.service.dataBehaviourSubject.next(this.data);
      } else {
        this.seconds += 1;
        if(this.seconds == 60){
          this.minutes += 1;
          this.seconds = 0;
        }
      }
    }, 1000);
  }
}
