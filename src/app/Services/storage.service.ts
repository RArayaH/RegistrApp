import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InterfaceAlumnos, Docentes } from '../Interfaces/interface';
import { APIAlumnosService } from './apialumnos.service';
import { Registro } from '../models/registro.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController } from '@ionic/angular';
import { AlertService } from './alert.service';

import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { File } from '@ionic-native/file/ngx';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  alumnos : InterfaceAlumnos [] = [];
  docentes: Docentes [] = [];
  registro: Registro[] = [];
  logeado: InterfaceAlumnos = {
    id: 0,
    usuario: '',
    nombre: '',
    email: '',
    avatar: '',
    telefono: '',
    carrera: '',
    jornada: '',
    password: ''
  }

  constructor(
    private api:APIAlumnosService, 
    private storage: Storage,
    private inAppBrowser: InAppBrowser,
    private navController: NavController, 
    private alertService: AlertService,
    private emailComposer: EmailComposer,
    private file: File
    ) {
      this.initStorage();
     }

  async initStorage(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarAlumnosStorage();
    this.guardarDocentesStorage();
  }


  async cargarAlumnosStorage(){
    this.alumnos = (await this.storage.get('alumnos')||[]);
    return this.alumnos;
  }


  async cargarDocentesStorage(){
    this.docentes = (await this.storage.get('docentes')||[]);
    return this.docentes;
  }


  async getDocentesStorage(array: Registro){
    this.docentes = (await this.storage.get('docentes')||[]);
    console.log("desde scan ",array.text.substr(8));
    console.log("desde api ", JSON.stringify(this.docentes));
    this.docentes.forEach(element => {
      console.log(element)
    });
    if (JSON.stringify(this.docentes).includes(array.text.substr(8))){
      console.log("true");
      this.registro.unshift( array );
      this._storage.set('registros', this.registro);      
      this.alertService.presentToast('Docente Guardado');
    }else{
      console.log("false");
      this.alertService.alertaInformacion("Docente No Válido");
    }
  }
 

  async cargarLogeadoStorage(){
    this.logeado = (await this.storage.get('logeado')||[]);
    return this.logeado;
  }

  
  guardarAlumnosStorage(){
    this.api.getAlumnos().subscribe( async respuesta => {
      this.alumnos = respuesta;
      await this._storage.set('alumnos', this.alumnos)
      });
  }


  guardarDocentesStorage(){
    this.api.getDocentes().subscribe( async respuesta => {
      this.docentes = respuesta;
      await this._storage.set('docentes', this.docentes)
      });
  }
  
  
  async inicioSesion(usuario: any, password: any){
    var valido: boolean = false;
    this.alumnos.forEach(alumno => {
      if (alumno.usuario == usuario && alumno.password == password) {
        valido = true;
        this.logeado.id = alumno.id;
        this.logeado.usuario = alumno.usuario;
        this.logeado.nombre = alumno.nombre;
        this.logeado.email = alumno.email;
        this.logeado.avatar = alumno.avatar;
        this.logeado.telefono = alumno.telefono;
        this.logeado.carrera = alumno.carrera;
        this.logeado.jornada = alumno.jornada;
        this.logeado.password = alumno.password;
      }
    });
    this._storage.set('logeado', this.logeado)
    this._storage.set('ingresado',true)
    return valido;
  }

  async cierreSesion(){
    this._storage.remove('logeado')
    this._storage.remove('ingresado')    
  }


  async guardarRegistro( format: string, text: string ){
    const nuevoRegistro = new Registro( format, text );
      if (nuevoRegistro.type == "user"){
        this.alertService.presentToast('Alumno Guardado');
      }else{
        this.getDocentesStorage(nuevoRegistro); 
      }
    this.abrirRegistro( nuevoRegistro );
  }


  async cargarRegistroAsistencia(){
      this.registro = (await this.storage.get('registros')) || [];
      return this.registro;
    }


  abrirRegistro(registro: Registro){
    switch ( registro.type ){
      case 'user':
        this.navController.navigateForward('/tabs/tab2');
        break;        
      case 'doce':
        this.navController.navigateForward('/tabs/tab2');
        break;
      case 'http':
        this.inAppBrowser.create( registro.text, '_system');
        break;
    };
  }   


  enviarMail(){
    const arrayEmail = [];
    this.registro.forEach(reg => {
    const row = `${reg.type},${reg.format},${reg.created},${reg.text.replace(',',' ')}\n`;
    arrayEmail.push(row);
    });
    this.fileEmail(arrayEmail.join(''));      
  }


  fileEmail(texto: string){
    this.file.checkFile(this.file.dataDirectory, 'registroAlumnos.csv').then( creado => {
    console.log("Directorio Creado",creado);
    return this.writingFile(texto);
    }).catch(err => {
      console.log("Directorio no creado");
      return this.file.createFile(this.file.dataDirectory,'registroAlumnos.csv',false)
        .then(existe => this.writingFile(texto))
        .catch(err2 => console.log("No se pudo crear archivo",err2));
    });
  }


  async writingFile(texto: string){
    await this.file.writeExistingFile(this.file.dataDirectory,'registroAlumnos.csv', texto);
    console.log("archivo creado " + this.file.dataDirectory + 'registroAlumnos.csv');
    const archivo = `${this.file.dataDirectory}registroAlumnos.csv`;
    const email = {
      to: 'ricardo.arayaha@gamail.com',      
      attachments: [
        archivo
      ],
      subject: 'Registro de asistencias',
      body: 'Estimado profesor:\n   Mucho gusto saludarlo, le hago envío del registro de asistencias.\n   Saludos',
      isHtml: true
    };
    this.emailComposer.open(email);
    }    
  }