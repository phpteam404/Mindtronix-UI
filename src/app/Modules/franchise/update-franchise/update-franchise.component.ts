import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToasterService } from 'src/app/utils/toaster.service';
import  dropdown  from 'src/app/jsons/dropdown.json';
import { HttpParams } from '@angular/common/http';
import { FranchiseService } from 'src/app/services/franchise.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-franchise',
  templateUrl: '../add-franchise/add-franchise.component.html',
  styleUrls: ['./update-franchise.component.scss']
})
export class UpdateFranchiseComponent implements OnInit {
  constructor(){}
  ngOnInit(): void {}
}
