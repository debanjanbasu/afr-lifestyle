/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavNetworkStripComponent } from './nav-network-strip.component';

describe('NavNetworkStripComponent', () => {
  let component: NavNetworkStripComponent;
  let fixture: ComponentFixture<NavNetworkStripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavNetworkStripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavNetworkStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
