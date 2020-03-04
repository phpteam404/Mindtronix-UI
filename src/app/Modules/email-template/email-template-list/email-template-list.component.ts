import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss']
})
export class EmailTemplateListComponent implements OnInit {

  list:any[];
  cols:any[];
  constructor(private _router: Router, private _ar: ActivatedRoute) {
    this.list=[
      {template_id:1,template_name:'Forgot Password', email_subject: 'Hello', status:'Active',actions:''},
      {template_id:2,template_name:'User Creation', email_subject: 'SUB: user Created', status:'Active',actions:''},
      {template_id:3,template_name:'Forgot Password2', email_subject: 'Hello', status:'Active',actions:''},
      {template_id:4,template_name:'Forgot Password3', email_subject: 'Hello', status:'Active',actions:''},
      {template_id:5,template_name:'Forgot Password4', email_subject: 'Hello', status:'Inactive',actions:''},
    ]
    this.cols=[
      { field: 'template_name', header: 'Template Name' },
      { field: 'email_subject', header: 'Email Subject' },
      { field: 'status', header: 'Status' },
      { field: 'actions', header: 'Actions' }
    ];
   }

  ngOnInit(): void {
  }

  updateTemplate(rowData){
    this._router.navigate(['update/'+rowData.template_name+'/'+btoa(rowData.template_id)],{relativeTo:this._ar});
  }

}
