import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { Vehicles } from './vehicles';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicles[] = [];

  constructor(private entitiesService: EntitiesService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    const imageUrls = [
      'https://lumiere-a.akamaihd.net/v1/images/sandcrawler-main_eb1b036b.jpeg',
      'https://static.wikia.nocookie.net/starwars/images/4/4d/T16skyhopper_negvv.png',
      'https://media.fortniteapi.io/images/08c9478fa30af29597e776dfab8593bc/full_featured.png',
      'https://static.wikia.nocookie.net/starwars/images/9/92/TIEfighter2-Fathead.png',
      'https://cornerboothsocialclub.files.wordpress.com/2012/07/06726_snowspeeder.jpg',
      'https://netrinoimages.s3.eu-west-2.amazonaws.com/2011/10/03/94587/39452/tie_bomber_from_star_wars_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_277752_o.jpg',
      'https://static.wikia.nocookie.net/starwars/images/1/16/AT-AT_2_Fathead.png',
      'https://static.wikia.nocookie.net/starwars/images/e/e9/At-st_large_pic.jpg',
      'https://static.wikia.nocookie.net/starwars/images/5/5f/StormIV_btm.jpg',
      'https://static.wikia.nocookie.net/starwars/images/8/8c/Sail_Barge.png'
    ];

    this.entitiesService.getAllVehicles().subscribe((vehiclesData) => {
      const vehicles = vehiclesData.results;

      const vehicleRequests = vehicles.map((vehicle: any) => {
        const filmUrls = vehicle.films;
        const filmRequests = filmUrls.map((filmUrl: string) => {
          const filmId = this.entitiesService.getFilmIdFromUrl(filmUrl);  
          return this.entitiesService.getFilm(filmId);
        });
        return forkJoin(filmRequests);
      });

      forkJoin(vehicleRequests).subscribe((filmsData: any) => {
        
        this.vehicles = vehicles.map((vehicle: any, index: number) => {
          const filmTitles = filmsData[index].map((filmData: any) => filmData.title);
          return {
            ...vehicle,
            image: imageUrls[index % imageUrls.length],
            showFilms: false,
            films: filmTitles
          };
        });
      });
    });
  }

  toggleVehicleFilms(vehicle: Vehicles): void {
    vehicle.showFilms = !vehicle.showFilms;
  }
}
