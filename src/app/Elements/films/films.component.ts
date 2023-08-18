import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { Films } from './films';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Films[] = [];
  peopleData: any[] = [];

  constructor(private entitiesService: EntitiesService) {}

  ngOnInit(): void {
    this.loadFilms();
  }

  loadFilms(): void {
    const imageUrls = [
      'https://m.media-amazon.com/images/I/91MMkv35K5L._RI_.jpg',
      'https://m.media-amazon.com/images/I/91mJqQ3gyhL._RI_.jpg',
      'https://images.fandango.com/ImageRenderer/0/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/231626/ROTJ_40_ONESHEET-WEB.jpg',
      'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
      'https://i.redd.it/rx1xq27wqry61.jpg',
      'https://i.ebayimg.com/images/g/EdUAAOSwo1lcAqxN/s-l1600.jpg'
    ];

    this.entitiesService.getAllFilms().subscribe((data) => {
      this.films = data.results.map((film: any, index: number) => {
        return {
          ...film,
          image: imageUrls[index % imageUrls.length],
          showPeople: false,
          people: film.people,
        };
      });
    });
  }

  togglePeople(film: Films): void {
    film.showPeople = !film.showPeople;

    if (film.showPeople && (!film.people || film.people.length === 0)) {
      const peopleRequests = (film.characters || []).map((peopleUrl: string) => {
        return this.entitiesService.getEntityByURL(peopleUrl)
          .pipe(map((peopleData: any) => peopleData.name));
      });

      forkJoin<string[]>(peopleRequests).subscribe((peopleNames: string[]) => {
        film.people = peopleNames;
      });
    } else if (!film.showPeople && film.people && film.people.length > 0) {
      const characterNameRequests = (film.people || []).map((peopleUrl: string) => {
        return this.entitiesService.getEntityByURL(peopleUrl)
          .pipe(map((peopleData: any) => peopleData.name));
      });

      forkJoin<string[]>(characterNameRequests).subscribe((characterNames: string[]) => {
        film.people = characterNames;
      });
    }
  }
}
