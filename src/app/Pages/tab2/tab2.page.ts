import { Component } from '@angular/core';
import { Registro } from 'src/app/models/registro.model';
import { StorageService } from 'src/app/services/storage.service';

import { NavController, Platform } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  usuarioActual: {} = {};
  registro: Registro[] = [];
  
  valido: boolean = false;

  constructor(
    private storageService: StorageService,
    private platform: Platform,
    private alertService: AlertService,
    private navController: NavController
  ) {
    this.cargarUsuarioActual();
    this.cargarRegistroAsistencia();
    this.validarPlataforma();
  }


  abrirRegistro( registro ){
    this.storageService.abrirRegistro( registro );
  }

  async cargarUsuarioActual():Promise<void>{
    this.usuarioActual = await this.storageService.cargarLogeadoStorage();
  }

  async cargarRegistroAsistencia():Promise<void>{
    this.registro = await this.storageService.cargarRegistroAsistencia();
  }
  
  enviarRegistro(){    
    console.log(this.valido)
    if (this.valido) {      
      this.storageService.enviarMail();
    } else {
      this.alertService.alertaInformacion("Funcion solo para celular");       
    }       
  }
  
  validarPlataforma(){
      if (this.platform.is('cordova')) {
      return this.valido=true;
    }    
  }

  logout(){
    this.storageService.cierreSesion();
    this.alertService.loadInicio("Cerrando su sesión");
    this.navController.navigateRoot('login', { animated: true });
  }

}