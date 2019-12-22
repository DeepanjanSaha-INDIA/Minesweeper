import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  rowNum = 10;
  colNum = 10;
  rowArr = Array(this.rowNum).fill(0).map((x,i)=>i);
  colArr = Array(this.colNum).fill(0).map((x,i)=>i);
  constructor() { }

  ngOnInit() {
    console.log(this.rowArr);
    console.log(this.colArr);
  }

}
