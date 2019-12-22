import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  rowNum: number;
  colNum: number;
  rowArr:Array<number>;
  colArr:Array<number>;
  matrix: Array<Array<number>>;
  constructor(private service: MainService) { }

  ngOnInit() {
    this.service.dataObservable.subscribe((data) => {
      this.rowNum = data.rowNum;
      this.colNum = data.colNum;
      this.rowArr = data.rowArr;
      this.colArr = data.colArr;
      this.matrix = data.matrix;
    });
  }

}
