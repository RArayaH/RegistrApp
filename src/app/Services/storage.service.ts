import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { InterfaceAlumnos } from '../Interfaces/interface-alumnos';
import { APIAlumnosService } from './apialumnos.service';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  alumnos : InterfaceAlumnos[]=[];

  constructor(
    private api:APIAlumnosService, 
    private storage: Storage
    ) {
      this.initStorage();
     }

  async initStorage(){
    const storage = await this.storage.create();
    this._storage = storage;
    this.guardarAlumnosStorage();
  }

  async cargarAlumnosStorage(){
    this.alumnos = (await this.storage.get('alumnos')||[]);
    return this.alumnos;
  }
  
  guardarAlumnosStorage(){
    this.api.getAlumnos().subscribe( async respuesta => {
      this.alumnos = respuesta;
      await this._storage.set('alumnos', this.alumnos)
      });
  }

   
    async inicioSesion(usuario: any, password: any){
      var valido: boolean = false;
      this.alumnos.forEach(alumno => {
        if (alumno.usuario == usuario && alumno.password == password) {
          valido = true;
          console.log('Exito ', alumno.nombre)
        }
      });
      return valido;
    }
}
