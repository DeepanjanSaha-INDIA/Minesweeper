import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Data } from 'src/app/model/data';
import { MainService } from 'src/app/service/main.service';

@Component({
  selector: 'app-result-dialog-box',
  templateUrl: './result-dialog-box.component.html',
  styleUrls: ['./result-dialog-box.component.css']
})
export class ResultDialogBoxComponent implements OnInit {

  constructor(private service: MainService, public dialogRef: MatDialogRef<ResultDialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit() {
    this.service.dataObservable.subscribe((data) => {
      this.data = data;
    });
  }

}
