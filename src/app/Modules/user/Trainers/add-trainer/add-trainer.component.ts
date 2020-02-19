import { Component, OnInit } from '@angular/core';
import {Message} from 'primeng/components/common/api';
@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.scss']
})
export class AddTrainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  activeIndex: number = 0;
    firstName: string;
    lastName: string;
    address: string;
 
    msgs: Message[] = [];
 
    next() {
        this.activeIndex++;
    }
 
    ok() {
        this.activeIndex = 0;
    }
 
    onChange(label: string) {
        this.msgs.length = 0;
        this.msgs.push({severity: 'info', summary: label});
    }

}
