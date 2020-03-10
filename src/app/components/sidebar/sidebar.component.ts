import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { Router} from '@angular/router';
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
 public menuItems: any[];
  breadcrumbList: Array<any> = [];
  name: string;
  menu:any=[];
  showSubmenu: boolean = false;
  public expandedIndex=-1;
  constructor(private ls: LocalStorageService,private router: Router) { 
    
  }
  ngOnInit() {
    this.menu = JSON.parse(this.ls.getItem('user')).menu;
    if(this.menu){
      this.menuItems=[];
      this.menu.forEach(item => { 
        var obj={
          path : item.module_url,
          title : item.module_name,
          icon : '',
          class:item.module_icon,
          showSubMenu: false,
          showFirst: true,
          childs:item.sub_menus
        };
        this.menuItems.push(obj);
      });
      this.menuItems.forEach(item=> {
        if(item.childs){
          var childs=[];
          childs = item.childs;
          item.childs =[];
          childs.forEach(ch => { 
            var obj={
              path : ch.module_url,
              title : ch.module_name,
              icon : '',
              class:ch.module_icon
            };
            item.childs.push(obj);
            item.childs[0].firstChild=true;
          });
        }
      });
      //this.menuItems = ROUTES.filter(menuItem => menuItem);
      // console.log('menuItems--',  this.menuItems );
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

  Collaps(index: number) {  
    this.expandedIndex = index === this.expandedIndex ? -1 : index;  
  }
  goToFirstChild(obj){
    var current = location.hash.split('#')[1];
    console.log('obj.path---',obj,'--current--', current);
    if(current.includes(obj.path)){
      console.log('own child');
    }else{
      console.log('others');
      if(obj.showSubmenu && obj.showFirst)
        this.router.navigate([obj.childs[0].path]);
      else this.router.navigate([obj.childs[0].path]);
    }
  }
}
