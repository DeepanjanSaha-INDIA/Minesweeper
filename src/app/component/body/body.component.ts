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
  flagged: Array<Array<boolean>>;

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

  clicked(r: number, c:number){
    if(this.flagged[r][c]==true){
      return;
    } else if(this.data.matrix[r][c]!=0){
      this.data.clickedMatrix[r][c]=true;
      return;
    } else {
      for(let row = Math.max(0, r-1); row<=Math.min(9, r+1); row++){
        for(let col = Math.max(0, c-1); col<=Math.min(9, c+1); col++){
          if(this.data.clickedMatrix[row][col]==true){
              continue;
          } else {
            this.data.clickedMatrix[row][col]=true;
            this.clicked(row, col);
          }
        }
      }
      return;
    }
  }

  flagging(e:Event, r: number, c:number){
    e.preventDefault();
    if(this.data.clickedMatrix[r][c]==true){
      console.log("returned");
      return;
    }
    console.log("flagged", r,c);
    if (this.flagged[r][c]==true){
      this.data.n_flag -= 1;
      this.flagged[r][c]=false;
      console.log("disablesd");
    } else {
      this.data.n_flag += 1;
      this.flagged[r][c]=true;
      console.log("enabled");
    }
    this.service.dataBehaviourSubject.next(this.data);
  }

  ngOnInit() {
    this.service.dataObservable.subscribe((data) => {
      this.data = data;
    });
    this.flagged = Array(this.data.rowNum);
    for(let i=0; i<this.data.rowNum; i++){
        this.flagged[i] = Array(this.data.colNum).fill(false);
    }
  }
}