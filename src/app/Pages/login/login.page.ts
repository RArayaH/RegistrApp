import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';
import { InterfaceAlumnos } from 'src/app/Interfaces/interface-alumnos';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  alumnos: InterfaceAlumnos[] = [];
  loginAlumno = {
    usuario: '',
    password: ''
  };


  constructor(
    private storageService: StorageService,
    private alert: AlertService,
    private navController: NavController
  ) { }

  async ngOnInit():Promise<void>{
    this.alumnos = await this.storageService.cargarAlumnosStorage();
  }

  async login(fLogin: NgForm){


    if ( fLogin.invalid ) { return this.alert.alertaInformacion('Campos Vacios'); }

    const valido  = await this.storageService.inicioSesion(this.loginAlumno.usuario, this.loginAlumno.password);
    console.log(valido);

    if ( valido ) {
      this.alert.loadInicio("Cargando su sesión");
      //this.guardarToken(this.loginUser.email);
      //this.storage.set('valido', valido)
      this.navController.navigateRoot( '/tabs/tab1', { animated: true } );
    } else {
      this.navController.navigateRoot('/login')
      this.alert.alertaInformacion('Usuario y contraseña no son correctos.');
      //this.token = null;
      //this.storage.remove('token');
    }








  }


}