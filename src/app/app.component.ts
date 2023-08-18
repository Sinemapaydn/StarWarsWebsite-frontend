import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSidebarActive = false;
  title: any;

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }

  
  
}

