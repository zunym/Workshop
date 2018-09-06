import { Component, OnInit, Input, Output, EventEmitter,  } from '@angular/core';

export interface ToPrint {
  name: string;
  count: number;
}
@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  title = "As Below"
  @Input() displayName:string = "Yin Mon";
  @Output() toPrint = new EventEmitter<ToPrint>()
  count =0;
  constructor() { }
  clicked(){
    this.count++;
    console.log("Count:",this.displayName);
    const eventObject : ToPrint = {
      name : this.displayName,
      count: this.count
    }
    this.toPrint.next(eventObject);
  }
  ngOnInit() {
  }

}
