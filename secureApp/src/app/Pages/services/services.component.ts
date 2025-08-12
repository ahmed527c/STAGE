import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService, ServiceRequest } from 'src/app/notification-service.service';
import { ServicesService } from 'src/app/SERVICES/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  selectedService: string | null = null;
  
  services: any[] = [];

  constructor(
    private serviceData: ServicesService,
    private notifService: NotificationService
  ) {}

  ngOnInit(): void {
    this.services = this.serviceData.services;
  }

  selectService(key: string) {
    this.selectedService = key;
  }

  cancel() {
    this.selectedService = null;
  }

  sendRequest(form: NgForm) {

    // Crée un objet sans utilisateurId (géré automatiquement dans addRequest)
    const requestData: Omit<ServiceRequest, 'utilisateurId'> = {
      serviceType: this.selectedService!,
      nom: form.value.name,
      email: form.value.email,
      telephone: form.value.tel,
      adresse: form.value.address,
      paiement: form.value.payment,
      urgence: form.value.urgency,
      message: form.value.message || ''
    };

    this.notifService.addRequest(requestData);
    form.resetForm();
    this.selectedService = null;

  }
}
