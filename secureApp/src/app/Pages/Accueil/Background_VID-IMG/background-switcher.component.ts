import { Component } from '@angular/core';
import { Slide } from 'src/app/Les_interfaces/slide';


@Component({
  selector: 'app-background-switcher',
  templateUrl: './background-switcher.component.html',
  styleUrls: ['./background-switcher.component.css']
})
export class BackgroundSwitcherComponent {
  slides: Slide[] = [
    {
      type: 'image',
      src: 'assets/img1.jpg',
      title: 'Sécurité optimale',
      description: 'Protégez votre maison avec nos caméras dernière génération.',
      btnText: 'Découvrir'
    },

      {
      type: 'video',
      src: 'assets/VID.mp4',
      title: 'Surveillance en temps réel',
      description: 'Visionnez en direct avec nos systèmes innovants.',
      btnText: 'Découvrir'
    }
  ];

  currentIndex = 1;

  get currentSlide() {
    return this.slides[this.currentIndex];
  }

  switchSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }


}







