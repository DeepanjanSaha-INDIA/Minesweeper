import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';
import { Data } from 'src/app/model/data';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  data: Data = new Data();
  constructor(private service: MainService) { }

  getTxtColor(r: number, c: number){
    if(this.data.clickedMatrix[r][c]==false){
      return '#003399';
    } else {
      return '#000000';
    }
  }

  getBgColor(r: number, c: number){
    if(this.data.clickedMatrix[r][c]==false){
      return '#003399';
    }
    let value = this.data.matrix[r][c];
    let color: Object = {0: '#ff0099', 1: '#9900cc', 2: '#0000ff', 3: '#0099ff', 4: '#009999',
    5: '#00cc00', 6: '#ffff00', 7:'#ff3300', 8:'#ff0000'};
    return color[value];
  }

  ngOnInit() {
    this.service.dataObservable.subscribe((data) => {
      this.data = data;
    });
  }
}