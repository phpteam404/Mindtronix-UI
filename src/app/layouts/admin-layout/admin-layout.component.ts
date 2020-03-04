import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import PerfectScrollbar from 'perfect-scrollbar';
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
  public childBreadCrumb: string;
  public currentRouteParam: string;
  
  private _router: Subscription;

  parentRoute: string;
  pageTitle: string;

  staticBreadCrumb = false;

  page: string;
  constructor(public location: Location, private router: Router, private _ar: ActivatedRoute) {
    this.staticBreadCrumb = false;
    /*console.log('_ar.data---', _ar.data);
    console.log('_ar.Snapshot ---', _ar.snapshot);
    console.log('_ar.URL ---', _ar.url);
    console.log('_ar.Fragment ---', _ar.fragment );
    console.log('_ar.Root ---', _ar.root );
    console.log('_ar.parent ---', _ar.parent );
    console.log('_ar.params---', _ar.params);
    console.log('_ar.firstChild ---', _ar.firstChild  );
    console.log('_ar.queryParams---', _ar.queryParams );
    console.log('_ar.children ---', _ar.children );*/
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => _ar),
      map(route => {
        while (route.firstChild) route = route.firstChild

        /*console.log('route===', route.routeConfig['data']); // path, component, data{breadcrumb:''}
        console.log('route---', route.parent.url['_value']);
        console.log('route***', route);
        console.log('route url params***', route.snapshot.params);
        console.log('route routeConfig---', route.routeConfig);*/

        this.currentRouteParam = route.snapshot.params.name;
        route.parent.url['_value'].forEach(item => { 
         // console.log('item*-*-*-', item.path);
          this.parentRoute = '/'+item.path;
        });

        return route
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      //console.log('route++++', data['breadcrumbs']);
      //console.log('route+**+', data);
      // console.log('current route', this.router.url);
      // console.log('current _ar', this._ar);
      this.breadCrumb = data['breadcrumb']
      this.childBreadCrumb = data['breadcrumbs']
      if(data['superParentPath']){
        this.parentRoute = '/'+data['superParentPath']+this.parentRoute;
      }
      if(data['title']){
        this.pageTitle = data['title'];
      }
    });
  }
  
  
  ngOnInit() {
    console.log(this.router)
      const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

      if (isWindows) {
          // if we are on windows OS we activate the perfectScrollbar function

          document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
      } else {
          document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
      }
      // const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
      const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');

      this.location.subscribe((ev:PopStateEvent) => {
        console.log(ev);
         // this.lastPoppedUrl = ev.url;
      });
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
     /* this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
           elemMainPanel.scrollTop = 0;
           elemSidebar.scrollTop = 0;
      });*/
      // if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      //     let ps = new PerfectScrollbar(elemMainPanel);
      //     ps = new PerfectScrollbar(elemSidebar);
      // }
  }
  // ngAfterViewInit() {
  //     this.runOnRouteChange();
  // }
  isMap(path){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      titlee = titlee.slice( 1 );
      if(path == titlee){
          return false;
      }
      else {
          return true;
      }
  }
  // runOnRouteChange(): void {
  //   if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
  //     const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
  //     const ps = new PerfectScrollbar(elemMainPanel);
  //     ps.update();
  //   }
  // }
  isMac(): boolean {
      let bool = false;
      if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
          bool = true;
      }
      return bool;
  }

}