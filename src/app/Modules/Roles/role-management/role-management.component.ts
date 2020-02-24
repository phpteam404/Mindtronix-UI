import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  superAdminCategories: string[] = ['one','two','three','four','five','six','seven','eight','night','ten','eleven'];
  siteAdminCategories: string[] = ['one','two','three','four','five','six','seven','eight','night','ten','eleven'];
  lcAdminCategories: string[] = ['three','five','eight','ten'];
  trainerCategories: string[] = ['three','five'];
  studentCategories: string[] = ['five'];
  OnlineUserCategories: string[] = ['five'];
  constructor() { }

  ngOnInit(): void {
  }

}
