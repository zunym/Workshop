import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  @Input() 
  cart : string[] = [];
  @Output()
  itemDeleted = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  removeItem(index: number){
    //put back
    const item = this.cart[index];
    //console.log('removing items: ', index);

    //delete 1 start from index
    console.log('removing item:', index);
    this.cart.splice(index, 1)

    this.itemDeleted.next(item);
  }
 
  
}
