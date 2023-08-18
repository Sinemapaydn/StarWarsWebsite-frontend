import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { Planets } from './planets';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {
  planets: Planets[] = [];


  constructor(private entitiesService: EntitiesService) {}

  ngOnInit(): void {
    this.loadPlanets();
  }

  loadPlanets(): void {
    const imageUrls = [
      'https://cdna.artstation.com/p/assets/images/images/034/094/970/large/ian-vicknair-beauty-small.jpg',
      'https://media.sketchfab.com/models/5fb96ae3cd404f0c946d968cd709d278/thumbnails/97551886a20b4db08cdef85fae9ddc63/c0d987bd1eb343aeb2940dd65dc6eabd.jpeg',
      'https://static.wikia.nocookie.net/starwars/images/a/a0/Eaw_Yavin4.jpg',
      'https://static.wikia.nocookie.net/starwars/images/8/81/Hoth_AoRCR.png',
      'https://pm1.aminoapps.com/5990/4cd6c45dbf0765ff73656b92e3a03ad8520ae80a_00.jpg',
      'https://i.kym-cdn.com/photos/images/newsfeed/000/782/084/ce9.png',
      'https://static.wikia.nocookie.net/starwars/images/5/50/Endor_FFGRebellion.png',
      'https://static.wikia.nocookie.net/starwars/images/2/24/NabooFull-SW.png',
      'https://lumiere-a.akamaihd.net/v1/images/image_51705c58.jpeg',
      'https://static.wikia.nocookie.net/starwars/images/a/a9/Eaw_Kamino.jpg'
    ];

    this.entitiesService.getAllPlanets().subscribe((data) => {
      this.planets = data.results.map((planet: any, index: number) => {
        return {
          ...planet,
          image: imageUrls[index % imageUrls.length],
          showResidents: false,
          residents: planet.residents,
        };
      });
    });
  }

  toggleResidents(planet: Planets): void {
    planet.showResidents = !planet.showResidents;

    if (planet.showResidents && (!planet.residents || planet.residents.length === 0)) {
      const residentRequest = (planet.residents || []).map((peopleUrl: string) => {
        return this.entitiesService.getEntityByURL(peopleUrl)
          .pipe(map((peopleData: any) => peopleData.name));
      });

      forkJoin<string[]>(residentRequest).subscribe((peopleNames: string[]) => {
        planet.residents = peopleNames;
      });
    } else if (!planet.showResidents && planet.residents && planet.residents.length > 0) {
      const residentNameRequests = (planet.residents || []).map((peopleUrl: string) => {
        return this.entitiesService.getEntityByURL(peopleUrl)
          .pipe(map((peopleData: any) => peopleData.name));
      });

      forkJoin<string[]>(residentNameRequests).subscribe((residentNames: string[]) => {
        planet.residents = residentNames;
      });
    }
  }
}
