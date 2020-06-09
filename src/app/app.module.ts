import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ScenarioService} from './scenario.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
    exports:[
        FormsModule,
        ReactiveFormsModule
    ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
   schemas: [
        NO_ERRORS_SCHEMA
      ],
  providers: [ScenarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
