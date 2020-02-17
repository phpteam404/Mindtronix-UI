import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] =[];/* [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user', title: 'User',  icon:'person', class: '' },
    { path: '/fee', title: 'Fee',  icon:'content_paste', class: '' },
    { path: '/learning_center', title: 'Learning Center',  icon:'library_books', class: '' }
];*/

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private ls: LocalStorageService,private router: Router) { }

  ngOnInit() {
    
    var menu = JSON.parse(this.ls.getItem('user')).menu;
    if(menu){
      this.menuItems=[];
      menu.forEach(item => { 
        var obj={
          path : item.module_url,
          title : item.module_name,
          icon : '',
          class:item.module_icon,
          child:item.childs
        };
        this.menuItems.push(obj);
      });
      //this.menuItems = ROUTES.filter(menuItem => menuItem);
      console.log('menuItems--',  this.menuItems );
    }else{
      this.ls.removeItem('user');
      this.router.navigate(['/login']);
    }
    
  }
  isMobileMenu() {
      //if ($(window).width() > 991) {
          return false;
      //}
      return true;
  };
}
