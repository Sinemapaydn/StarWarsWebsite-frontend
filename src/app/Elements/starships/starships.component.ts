import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { Starships } from './starships';

@Component({
  selector: 'app-starships',
  templateUrl: './starships.component.html',
  styleUrls: ['./starships.component.css']
})
export class StarshipsComponent implements OnInit {
  starships: Starships[] = [];

  constructor(private entitiesService: EntitiesService) {}

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships(): void {
    const imageUrls = [
      'https://swrpggm.com/wp-content/uploads/2021/02/CorellianCR90_FE.png',
      'https://lumiere-a.akamaihd.net/v1/images/Star-Destroyer_ab6b94bb.jpeg',
      'https://static.wikia.nocookie.net/starwarsrebels/images/4/44/Sentinel-classShuttle.jpg',
      'https://www.photomural.com/media/catalog/product/cache/2/thumbnail/9df78eab33525d08d6e5fb8d27136e95/1/2/12405.jpg',
      'https://assets-prd.ignimgs.com/2023/01/11/legomillenniumfalcon-1673459427221.jpg',
      'https://lumiere-a.akamaihd.net/v1/images/resistance-ywing-main_10b5e63d.jpeg',
      'https://netrinoimages.s3.eu-west-2.amazonaws.com/2005/05/06/1656/116341/starwars_xwing_fighter_with_interior_3d_model_c4d_max_obj_fbx_ma_lwo_3ds_3dm_stl_1414051_o.jpg',
      'https://lumiere-a.akamaihd.net/v1/images/tie-interceptor-2_b2250e79.jpeg',
      'https://oyster.ignimgs.com/mediawiki/apis.ign.com/lego-star-wars-the-skywalker-saga/3/32/Capital_Ships_-_Executor.png',
      'https://4.bp.blogspot.com/-aDB79v_b9w4/V7C8wfnNE7I/AAAAAAAAKyc/IKA6VrxOlfYq0ns2KVhTWBu_60_ihb6bACLcB/s1600/Rebel_transport_box_art.jpg',
    ];

    this.entitiesService.getAllStarships().subscribe((starshipsData) => {
      const starships = starshipsData.results;

      const starshipRequests = starships.map((starship: any) => {
        const filmUrls = starship.films;
        const filmRequests = filmUrls.map((filmUrl: string) => {
          const filmId = this.entitiesService.getFilmIdFromUrl(filmUrl);  
          return this.entitiesService.getFilm(filmId);
        });
        return forkJoin(filmRequests);
      });

      forkJoin(starshipRequests).subscribe((filmsData: any) => {
        
        this.starships = starships.map((starship: any, index: number) => {
          const filmTitles = filmsData[index].map((filmData: any) => filmData.title);
          return {
            ...starship,
            image: imageUrls[index % imageUrls.length],
            showFilms: false,
            films: filmTitles
          };
        });
      });
    });
  }


  toggleStarshipFilms(starship: Starships): void {
    starship.showFilms = !starship.showFilms;
  }
}
