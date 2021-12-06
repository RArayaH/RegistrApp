import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { NavController } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  logeadoActual: {} = {};

  constructor(
    private barcodeScanner: BarcodeScanner, 
    private storageService: StorageService,
    private navController: NavController,
    private alert: AlertService
    ) {}

    ngOnInit(){
      this.cargarLogeadoActual();
    }

  scan(){
    console.log("Click a Scan")

    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);

      if( !barcodeData.cancelled ){
        this.storageService.guardarRegistro( barcodeData.format, barcodeData.text );
      }

    }).catch(err => {                  
        this.storageService.guardarRegistro( 'QRCode', 'docente:{"id":1,"seccion":"001V","asignatura":"APLICACIONES MOVILES","docente":"Nancy Bernal Sanchez","correo":"nan.bernal@profesor.duoc.cl","avatar":"../assets/fotoPerfil/docente1.png"}');
      });

    }

    async cargarLogeadoActual():Promise<void>{
      this.logeadoActual = await this.storageService.cargarLogeadoStorage();
    }

    logout(){
      this.storageService.cierreSesion();
      this.alert.loadInicio("Cerrando su sesión");
      this.navController.navigateRoot('login',{ animated: true });
    }
  }



