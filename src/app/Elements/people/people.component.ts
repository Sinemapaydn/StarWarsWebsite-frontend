import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { People } from './people';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: People[] = [];
  

  constructor(private entitiesService: EntitiesService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    const imageUrls = [
      'https://rollingstone.uol.com.br/media/_versions/luke_star_wars_widelg.jpg',
      'https://lumiere-a.akamaihd.net/v1/images/6023eab8d941ed00018d113f-image_6f532508.jpeg',
      'https://www.sideshow.com/storage/product-images/910748/r2-d2_star-wars_square.jpg',
      'https://cicicee.com/wp-content/uploads/2015/12/Darth-Vader-Foto%C4%9Fraflar%C4%B1-10.jpg',
      'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F12%2Fhot-toys-leia-organa-star-wars-the-last-jedi-figure-0.jpg',
      'https://static.wikia.nocookie.net/starwars/images/9/91/OwenLarsHS-SWE.jpg',
      'https://files.cults3d.com/uploaders/13393952/illustration-file/1cf1a476-0742-4145-87dc-5f73a65c7bc1/Aunt_Beru_1.jpg',
      'https://lumiere-a.akamaihd.net/v1/images/r5-d4_main_image_7d5f078e.jpeg?region=374%2C0%2C1186%2C666',
      'https://lumiere-a.akamaihd.net/v1/images/image_157136c7.png',
      'https://static1.srcdn.com/wordpress/wp-content/uploads/2020/09/Obi-Wan-Death-Scene-In-A-New-Hope.jpg'
    ];

    this.entitiesService.getAllPeople().subscribe((peopleData) => {
      const people = peopleData.results;

      const personRequests = people.map((person: any) => {
        const filmUrls = person.films;
        const filmRequests = filmUrls.map((filmUrl: string) => {
          const filmId = this.entitiesService.getFilmIdFromUrl(filmUrl);  
          return this.entitiesService.getFilm(filmId);
        });
        return forkJoin(filmRequests);
      });

      forkJoin(personRequests).subscribe((filmsData: any) => {
        this.people = people.map((person: any, index: number) => {
          const filmTitles = filmsData[index].map((filmData: any) => filmData.title);
          return {
            ...person,
            image: imageUrls[index % imageUrls.length],
            showFilms: false,
            films: filmTitles
          };
        });
      });
    });
  }
  togglePeopleFilms(person: People): void {
    person.showFilms = !person.showFilms;
  }
}