import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  logeadoActual: {} = {};

  constructor(
    private storageService: StorageService,
    private navController: NavController,
    private alertService: AlertService
    ) {}

  ngOnInit(){
    this.cargarLogeadoActual();
  }

  async cargarLogeadoActual():Promise<void>{
    this.logeadoActual = await this.storageService.cargarLogeadoStorage();
  }

  logout(){
    this.storageService.cierreSesion();
    this.alertService.loadInicio("Cerrando su sesión");
    this.navController.navigateRoot('login',{ animated: true });
  }    

}
