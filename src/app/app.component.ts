import { Component, HostListener } from '@angular/core';
import { NavigationError, NavigationCancel, NavigationEnd, NavigationStart, RouterEvent, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './utils/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mindtronics';
  loading = true;
  currentUser: any;
  constructor(private router:Router, private ls: LocalStorageService,private authService: AuthenticationService){
    console.log('AppComponent----' );

    if (this.ls.getItem('user')) {
    } else {
      this.logout();
    }

    // for router interception
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
    this.currentUser = this.ls.getItem('user');
  }  

logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }

  @HostListener("window:onbeforeunload",["$event"])
    clearLocalStorage(event){
        localStorage.clear();
    }
}
