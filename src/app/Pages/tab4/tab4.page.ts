import { Component, OnInit } from '@angular/core';
import { InterfaceAlumnos } from 'src/app/Interfaces/interface';
import { AlertService } from 'src/app/services/alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  private _storage: Storage | null = null;
  alumnos: InterfaceAlumnos[];

  constructor(
    private storageService: StorageService,
    private alert:AlertService
    ) {}

    async ngOnInit():Promise<void>{
      this.alumnos = await this.storageService.cargarAlumnosStorage();
    }


}
