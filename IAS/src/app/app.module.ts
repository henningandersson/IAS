import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

// Filter
import { FilterPipe, OrderByPipe } from './pipes';

//Services
import { TaxonService } from './services';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // Pipes
    FilterPipe,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TaxonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
