import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    //save data
    shoppingList : string[] = [];
    //only add exist, not add if not exist
    @Output() returnItem = new EventEmitter<string>();
    newItem(item:string){
      for(let i in this.shoppingList){
        //duplicate detect
        if(item==this.shoppingList[i])
        
        return;
      }

      console.log(">>>>new items: ", item);
      this.shoppingList.push(item);
    }
    deleteItem(item:string){
      console.log("deleting items: ", item);
      this.returnItem.next(item);
    }
}
