import { Component, OnInit, ViewChild } from '@angular/core';
import { NoteService } from '../services/note.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})

export class NoteComponent implements OnInit {
  @ViewChild('rgForm')
 
  rgForm: NgForm;
  listOfCities= [];
  
  constructor(private route:Router, private noteSvc: NoteService) { }
  title = "User Registration Form";
  ngOnInit() {
  }

  processLP(myform: NgForm) {
    console.log('myform:', myform.value)
    console.log('Processing LP: ', this.rgForm.value);
    for (let k in this.rgForm.value) {
      console.log('k=', k, 'v=', this.rgForm.value[k]);
    }

    //backend api
    this.noteSvc
    .addNote(myform.value)
    .subscribe((result) => {
      console.log('form value: ', result);
    });

   myform.resetForm();
   this.route.navigate(['/thank'])
  }

}
