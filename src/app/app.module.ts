import { HttpClient, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsComponent } from './Elements/films/films.component';
import { HomepageComponent } from './Elements/homepage/homepage.component';
import { PeopleComponent } from './Elements/people/people.component';
import { PlanetsComponent } from './Elements/planets/planets.component';
import { SpeciesComponent } from './Elements/species/species.component';
import { StarshipsComponent } from './Elements/starships/starships.component';
import { VehiclesComponent } from './Elements/vehicles/vehicles.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    PeopleComponent,
    PlanetsComponent,
    SpeciesComponent,
    StarshipsComponent,
    VehiclesComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
