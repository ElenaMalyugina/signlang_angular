import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
class ToggleModel{
  step: number;
  isActive: boolean;

  constructor(data){
    if(typeof data =="number"){
       this.step = data;
    }
  }
}

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {
  @Input() togglesCount: number = 0;
  @Output() toggleActive: EventEmitter<number> = new EventEmitter();


  toggles: ToggleModel[] =[];

  changeButtonActive(stepNum: number){
    this.toggles.forEach(el=>el.isActive = false);
    this.toggles[stepNum].isActive = true;
    this.toggleActive.emit(stepNum);
  }

  constructor() { }

  ngOnInit() {
    for(let i =0; i< this.togglesCount; i++){
      this.toggles.push(new ToggleModel(i));
    }
    
    this.toggles[0].isActive= true;
    
  }

}
