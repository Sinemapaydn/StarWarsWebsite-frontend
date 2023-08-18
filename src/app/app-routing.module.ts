import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsComponent } from './Elements/films/films.component';
import { HomepageComponent } from './Elements/homepage/homepage.component';
import { PeopleComponent } from './Elements/people/people.component';
import { PlanetsComponent } from './Elements/planets/planets.component';
import { SpeciesComponent } from './Elements/species/species.component';
import { StarshipsComponent } from './Elements/starships/starships.component';
import { VehiclesComponent } from './Elements/vehicles/vehicles.component';


const routes: Routes = [
  { path: '', component: HomepageComponent }, 
  { path: 'films', component: FilmsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'starships', component: StarshipsComponent },
  { path: 'vehicles', component: VehiclesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
