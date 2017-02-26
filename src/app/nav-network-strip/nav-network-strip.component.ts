import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-network-strip',
  templateUrl: './nav-network-strip.component.html',
  styleUrls: ['./nav-network-strip.component.scss']
})
export class NavNetworkStripComponent implements OnInit {
  public isNavbarCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
