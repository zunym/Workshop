import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';

export interface LineItem {
  // attribute
  label: string;
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  // Hardcoded Inventory List
  inventory: LineItem[] = [
    { label: "Acorn Squash", image: "acorn_squash.png", quantity: 10 },
    { label: "Apple", image: "apple.png", quantity: 10 },
    { label: "Bell Pepper", image: "bell_pepper.png", quantity: 10 },
    { label: "Blue Berries", image: "blueberries.png", quantity: 10 }
  ];

  @Output() itemSelected = new EventEmitter<string>();
  @Input() newInventory : EventEmitter<string>;
  constructor() { }

  ngOnInit() {
    this.newInventory.subscribe(
      (item)=>{
        console.log("New inventory to be added: ",item);
        for(let i of this.inventory)
        {
          if(i.label == item)
          i.quantity++;
        }
      }
    );
  }

  processItem(n:number){
    this.inventory[n].quantity--;
    console.log("items", this.inventory[n].label)
    this.itemSelected.next(this.inventory[n].label)
  }
}
