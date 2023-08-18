import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { EntitiesService } from 'src/app/services/entities.service';
import { Species } from './species';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {
  species: Species[] = [];

  constructor(private entitiesService: EntitiesService) { }

  ngOnInit(): void {
    this.loadSpecies();
  }

  loadSpecies(): void {
    const imageUrls = [
      'https://theforceuniverse.com/wp-content/uploads/2022/08/Padme-Amidala-Naberrie-star-wars-wiki.webp',
      'https://media.cnn.com/api/v1/images/stellar/prod/151207125938-bb-8-tease.jpg',
      'https://lumiere-a.akamaihd.net/v1/images/wookiee-bio-1_541e8c87.jpeg',
      'https://static.wikia.nocookie.net/muc/images/8/84/Rodian.jpg',
      'https://upload.wikimedia.org/wikipedia/en/5/53/Jabba_the_Hutt_in_Return_of_the_Jedi_%281983%29.png',
      'https://upload.wikimedia.org/wikipedia/en/9/9b/Yoda_Empire_Strikes_Back.png',
      'https://lumiere-a.akamaihd.net/v1/images/trandoshian-main_19804be7.jpeg',
      'https://www.looper.com/img/gallery/star-wars-the-mon-calamari-explained/l-intro-1605299609.jpg',
      'https://metro.co.uk/wp-content/uploads/2020/06/PRI_154349701-e1591960655527.jpg',
      'https://static.wikia.nocookie.net/battlefront/images/3/3a/Sullustan_Head.png',
    ];

    this.entitiesService.getAllSpecies().subscribe((data) => {
      this.species = data.results.map((specie: any, index: number) => {
        return {
          ...specie,
          image: imageUrls[index % imageUrls.length],
          showHomeworld: false,
          homeworldData: null,
        };
      });
    });
  }

  toggleHomeworld(specie: Species): void {
    specie.showHomeworld = !specie.showHomeworld;

    if (specie.showHomeworld && !specie.homeworldData) {
      if (specie.homeworld) {
        this.entitiesService.getEntityByURL(specie.homeworld).subscribe((homeworldData: any) => {
          specie.homeworldData = homeworldData;
        });
      }
    }
  }
}


