import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  @Input() message:string;
  fontSize = '1em'

  @Output() onFontSize = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  fontChanged($event){
    const fontSize = parseInt($event.target.value);
    this.fontSize = `${fontSize}em`;
    this.onFontSize.next(fontSize);


  }
}
