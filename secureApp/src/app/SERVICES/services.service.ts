import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }
   services = [
   
    {
      title: 'Livraison – Transport sécurisé et rapide',
      image: 'assets/Serv_img/serv1.png',
      key: 'livraison'
    },
    {
      title: 'Installation – Mise en place par nos experts',
      image: 'assets/Serv_img/serv2.jpg',
      key: 'installation'
    },
    {
      title: 'Maintenance – Suivi et assistance continue',
      image: 'assets/Serv_img/serv3.jpg',
      key: 'maintenance'
    }
  ];
}
