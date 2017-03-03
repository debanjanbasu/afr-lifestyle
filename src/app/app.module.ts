
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavNetworkStripComponent } from './nav-network-strip/nav-network-strip.component';
import { LogoAndSearchComponent } from './logo-and-search/logo-and-search.component';

@NgModule({
  declarations: [
    AppComponent,
    NavNetworkStripComponent,
    LogoAndSearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  exports: [AppComponent]
})
export class AppModule { }
