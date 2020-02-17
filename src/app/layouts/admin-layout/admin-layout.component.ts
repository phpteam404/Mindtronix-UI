import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
import * as $ from "jquery";
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];
  public breadCrumb: string;
  public breadCrumbD: string;

  parentRoute: string = '';
  staticBreadCrumb = false;

  page:string;
  constructor( public location: Location, private router: Router, private _ar: ActivatedRoute) {
    this.staticBreadCrumb = false;
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => _ar),
      map(route => {
        while (route.firstChild) route = route.firstChild
        return route
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data =>{
      console.log('this.breadCrumb 1', data['breadcrumbs']);
      console.log('current route', this.router.url);
      console.log('current _ar', this._ar);
      this.breadCrumb = data['breadcrumbs']

      if(this.router.url === '/franchise/add'){
        this.breadCrumb = ' Add Franchise';
        this.staticBreadCrumb = true;
        this.parentRoute = '/franchise';
      }
      else {
        this.breadCrumb = data['breadcrumbs']
        this.parentRoute = '';
        this.staticBreadCrumb = false;
      } 
    });
  }
  go(){
    this.router.navigate(['/franchise']);
  }

  ngOnInit() {
    this.staticBreadCrumb = false;
     // const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      //if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function

          //document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
    //  } else {
        //  document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
     // }
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

     
       this.router.events.subscribe((event:any) => {
          if (event instanceof NavigationStart) {
             if (event.url != this.lastPoppedUrl)
                 this.yScrollStack.push(window.scrollY);
         } else if (event instanceof NavigationEnd) {
             if (event.url == this.lastPoppedUrl) {
                 this.lastPoppedUrl = undefined;
                 window.scrollTo(0, this.yScrollStack.pop());
             } else
                 window.scrollTo(0, 0);
         }
      });
      
      // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      //     let ps = new PerfectScrollbar(elemMainPanel);
      //     ps = new PerfectScrollbar(elemSidebar);
      // }

  }
  ngAfterViewInit() {
    this.runOnRouteChange();
}
// isMap(path){
//     var titlee = this.location.prepareExternalUrl(this.location.path());
//     titlee = titlee.slice( 1 );
//     if(path == titlee){
//         return false;
//     }
//     else {
//         return true;
//     }
// }
runOnRouteChange(): void {
//   if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
//     const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
//     const ps = new PerfectScrollbar(elemMainPanel);
//     ps.update();
//   }
}
isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
        bool = true;
    }
    return bool;
}

}

