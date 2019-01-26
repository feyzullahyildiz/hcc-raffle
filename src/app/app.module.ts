import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NumberRuffleComponent } from './pages/number-ruffle/number-ruffle.component';
import { RuffleListComponent } from './pages/ruffle-list/ruffle-list.component';
import { RuffleItemComponent } from './pages/ruffle-list/ruffle-item/ruffle-item.component';
import { RuffleButtonComponent } from './pages/ruffle-button/ruffle-button.component';
import { DescriptionComponent } from './pages/description/description.component';

@NgModule({
  declarations: [
    AppComponent,
    RuffleListComponent,
    WelcomeComponent,
    NumberRuffleComponent,
    RuffleItemComponent,
    RuffleButtonComponent,
    DescriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
