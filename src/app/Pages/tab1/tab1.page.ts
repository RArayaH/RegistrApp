import { Component, OnInit } from '@angular/core';
import { InterfaceAlumnos } from 'src/app/Interfaces/interface-alumnos';
import { StorageService } from 'src/app/Services/storage.service';
import { AlertService } from '../../Services/alert.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  private _storage: Storage | null = null;
  alumnos: InterfaceAlumnos[];

  constructor(
    private storageService: StorageService,
    private alert:AlertService
    ) {}

    async ngOnInit():Promise<void>{
      this.alumnos = await this.storageService.cargarAlumnosStorage();
      console.log('Desde ngOnInit → ',this.alumnos)
    }

}
