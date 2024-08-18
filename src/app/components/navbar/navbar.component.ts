import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  reportOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  navOpen = false;

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  toggleReport() {
    this.reportOpen = !this.reportOpen;
  }

}
