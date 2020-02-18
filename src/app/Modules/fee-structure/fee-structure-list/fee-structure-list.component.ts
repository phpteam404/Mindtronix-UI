import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-fee-structure-list',
  templateUrl: './fee-structure-list.component.html',
  styleUrls: ['./fee-structure-list.component.scss']
})
export class FeeStructureListComponent implements OnInit {

  constructor(private router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  AddNewFeeStructure(event: Event){
    this.router.navigate(['add'], {relativeTo: this._route});
  }
}
