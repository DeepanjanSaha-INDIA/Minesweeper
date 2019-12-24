import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';
import { Data } from 'src/app/model/data';

import {MatDialog, MatDialogConfig} from "@angular/material";
import { ResultDialogBoxComponent } from '../result-dialog-box/result-dialog-box.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  data: Data = new Data();
  flagged: Array<Array<boolean>>;

  constructor(private service: MainService, private dialog: MatDialog) { }

  // Color of the number displayed in box
  getTxtColor(r: number, c: number){
    if(this.data.clickedMatrix[r][c]==false){
      return '#003399';
    } else {
      return '#000000';
    }
  }

  // Color of the background of the box
  getBgColor(r: number, c: number){
    if(this.data.clickedMatrix[r][c]==false){
      return '#003399';
    }
    let value = this.data.matrix[r][c];
    let color: Object = {0: '#ff0099', 1: '#9900cc', 2: '#0000ff', 3: '#0099ff', 4: '#009999',
    5: '#00cc00', 6: '#ffff00', 7:'#ff3300', 8:'#ff0000'};
    return color[value];
  }

  // Checking if game is over (won or lost)
  checkEndGame(r:number, c:number){
    // Checking the lost condition
    if(this.data.matrix[r][c]==9){
      this.data.gameOver = true;
      this.data.result = "YOU LOST";
      this.service.dataBehaviourSubject.next(this.data);
      this.finalResult();
    }

    // Check the winning condition
    let total = 0;
    for(let row=0; row<this.data.rowNum; row++){
      for(let col=0; col<this.data.colNum; col++){
        if(this.data.clickedMatrix[row][col]==true){
          total+=1;
        }
      }
    }
    if(total == this.data.rowNum*this.data.rowNum - this.data.bomb){
      this.data.gameOver = true;
      this.data.result = "YOU WON";
      this.service.dataBehaviourSubject.next(this.data);
      this.finalResult();
    }
  }

  // Function executed when button is clicked
  clicked(r: number, c:number){
    if(this.flagged[r][c]==true){
      // If flagged return
      return;
    } else if(this.data.matrix[r][c]!=0){
      // If numbered block is pressed
      this.data.clickedMatrix[r][c]=true;
      this.checkEndGame(r,c);
      return;
    } else {
      // If a empty block is pressed
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
      this.checkEndGame(r,c);
      return;
    }
  }

  // Function executed when button is flaffed (right clicked)
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

  // Show final result in dialog box
  finalResult() {
    console.log("result is out");
    const dialogRef = this.dialog.open(ResultDialogBoxComponent, {
      width: '250px',
      data: this.data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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