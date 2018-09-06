import { Component } from '@angular/core';
import { ToPrint } from './components/hello.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  listOfNames = ['A','B','C'];
  toDisplay: string = 'Fred'

  nameSelected(name: string) {
    console.log('clicked: ', name);
    this.toDisplay = name;
  }

  //name is $event - from toPrint.next(this.displayName)
}
