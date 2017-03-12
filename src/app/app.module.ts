
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavNetworkStripComponent } from './nav-network-strip/nav-network-strip.component';
import { LogoAndSearchComponent } from './logo-and-search/logo-and-search.component';
import { NavPrimaryComponent } from './nav-primary/nav-primary.component';
import { FooterComponent } from './footer/footer.component';
import { BrandTopStoriesFooterComponent } from './brand-top-stories-footer/brand-top-stories-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavNetworkStripComponent,
    LogoAndSearchComponent,
    NavPrimaryComponent,
    FooterComponent,
    BrandTopStoriesFooterComponent
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
