import { Injectable } from '@angular/core';
import { Data } from '../model/data';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private data : Data = new Data();
  private dataBehaviourSubject = new BehaviorSubject<Data>(this.data);
  dataObservable = this.dataBehaviourSubject.asObservable();

  constructor() { }
}
