import { Component, OnInit, ElementRef } from '@angular/core';
//import { ROUTES } from '../../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/utils/local-storage.service';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/services/shared.service';
import { HttpParams } from '@angular/common/http';
@Component({
    // moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    prdAssetPath:string = environment.prdAssetPath;
    location: Location;
    private toggleButton: any;
    ly: SidebarComponent;
    private sidebarVisible: boolean;
    curUser:any;
    notificationCount:number=0;
    notifications:any;
    constructor(location: Location,
               private element: ElementRef,
               private router:Router,
               public _ss: SharedService,
               private ls: LocalStorageService,
               private authService: AuthenticationService) {
      this._ss = _ss;
      this.location = location;
      this.sidebarVisible = false;
      this._ss.getEmittedValue().subscribe(item => {
        this.curUser=ls.getItem('user',true).data;
      });
      this._ss.getNotification().subscribe(item => {
        this.notificationCount = item.total_records;
        this.notifications = item.data;
      });
      this.curUser = ls.getItem('user',true).data;
    }

    ngOnInit(){
     // this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
      this.getNotifications();
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    public toggleMenu():void {
        // 1-line if statement that toggles the value:
        // this.menuState = this.menuState === 'show-menu' ? 'hide-menu' : 'show-menu';
        if (document.body.classList.contains('show-menu')) {
          document.body.classList.remove('show-menu');
          // document.body.classList.remove('hide-menu');
        } else {
          document.body.classList.add('show-menu');
          // this.renderer.removeClass(document.body, 'show-menu');
          // document.body.classList.add('hide-menu');
         
        }
        if (window.innerWidth <= 800) {
          if (document.body.classList.contains('stage-menu-open')) {
            document.body.classList.remove('stage-menu-open')
          }
    }}

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
    profile(){
      this.router.navigate(['/profile']);
    }    
    getNotifications() {
      var parmas = new HttpParams()
                    .set("notification_status","unread")
                    .set("start",0+'')
                    .set("number",3+'');
      this.authService.getNotifications(parmas).subscribe(res => {
        if(res.status){
          console.log("Notifications ===", res);
          this.notificationCount = res.data.total_records?res.data.total_records:0;
          this.notifications = res.data.data;
        }
      });
    }
}
