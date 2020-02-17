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
  breadcrumbList: Array<any> = [];
  name: string;
  menu:any=[];

  constructor(private ls: LocalStorageService,private router: Router) { }
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
          });
        }
      });
      //this.menuItems = ROUTES.filter(menuItem => menuItem);
      console.log('menuItems--',  this.menuItems );
      this.listenRouting();
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


  /* Listening for routing events */
  listenRouting() {
    console.log('called listenRouting---',this.router.events);
    let routerUrl: string, routerList: Array<any>, target: any;
    this.router.events.subscribe((router: any) => {
      routerUrl = router.urlAfterRedirects;
      if (routerUrl && typeof routerUrl === 'string') {
        // initialization breadcrumb
        target = this.menu;
        this.breadcrumbList.length = 0;
        // Get the current routing URL / zone, [0] = first layer, [1] = second layer ... etc
        routerList = routerUrl.slice(1).split('/');
        routerList.forEach((router, index) => {
          // Find the path of this layer in the menu and the same path as the current routing
        target = target.find(page => page.path.slice(2) === router);
          // After saving to the breadcrumbList, the list will be looped directly after the time is up.
        this.breadcrumbList.push({
            name: target.name,
            // The routing of the second layer must be added to the routing of the previous layer. Using relative positions will cause routing errors.
            path: (index === 0) ? target.path : `${this.breadcrumbList[index-1].path}/${target.path.slice(2)}`
          });
          
          // The target of the next layer to be compared is the subpage specified by this layer
          if (index+1 !== routerList.length) {
            target = target.children;
          }
        });

        console.log('this.breadcrumbList===>>>',this.breadcrumbList);
      }
    });
  }
}
