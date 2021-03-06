import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* added from angular internals */
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaderResponse, HTTP_INTERCEPTORS } from '@angular/common/http';

/* added from external angular packages */
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

/* added from external node packages */
import { GaugeModule } from 'angular-gauge';

/* components */
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './components/home/home.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { GameDetailsTabsComponent } from './components/game-details-tabs/game-details-tabs.component';

/* services */
import { HttpApiAuthInterceptor } from './services/interceptors/http-api-auth.interceptor';
import { HttpErrorsInterceptor } from './services/interceptors/http-errors.interceptor';
import { HttpLoggerInterceptor } from './services/interceptors/http-logger.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    GameDetailsComponent,
    GameDetailsTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GaugeModule.forRoot(), // .forRoot register service in router singleton. See https://angular.io/guide/singleton-services#the-forroot-pattern
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpApiAuthInterceptor,
      multi: true // allows for a different provider in a different context
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true // allows for a different provider in a different context
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoggerInterceptor,
      multi: true // allows for a different provider in a different context
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
