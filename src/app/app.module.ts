import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { NavComponent } from './nav/nav.component';
import { UploadComponent } from './upload/upload.component';
import { HomeComponent } from './home/home.component';
import { PredictionService } from './services/prediction.service';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    NavComponent,
    UploadComponent,
    HomeComponent
  ],
  imports: [
    appRoutes,
    BrowserModule,
    HttpModule
  ],
  providers: [
    PredictionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
