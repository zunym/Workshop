import { Component } from '@angular/core';
import { ToPrint } from './components/hello.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-second-apps';
  listOfName=['A', 'B', 'C', 'D', 'E'];
  toDisplay: string = "fred";
  
  selectedItems(name:string){
    this.toDisplay = name;
    console.log("selected name: ", name)
  }

  pleasePrintThis(eventObject: ToPrint) {
    console.log("item to print: ", eventObject)
  }
}
