// mascota.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Mascota } from '../../models/mascota.model';
import { MascotaService } from '../../services/mascota.service';
import { MascotaResponse } from '../../interfaces/mascotaResponse';
import { NuevoMascotaComponent } from '../nuevo-mascota/nuevo-mascota.component';
import { EditarMascotaComponent } from '../editar-mascota/editar-mascota.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {
  mascotas!: Mascota[];
  nombreBusqueda = '';
  propietarioBusqueda = '';
  especieSeleccionada = 'todos';
  page = 1;
  pageSize = 5;
  totalItems = 0; 

  constructor(private mascotaService: MascotaService,  public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getMascotas();
  }

  getMascotas(): void {
    this.mascotaService.getMascotas(this.page, this.pageSize, this.nombreBusqueda, this.propietarioBusqueda, this.especieSeleccionada).subscribe((response: MascotaResponse) => {
      this.mascotas = response.data;
      this.totalItems = response.pagination.totalItems;
    });
  }
  
  buscar(): void {
    this.page = 1;
    this.getMascotas();
  }

  agregarMascota(): void {
    const dialogRef = this.dialog.open(NuevoMascotaComponent, {
      width: '600px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMascotas();
      }
    });
  }

  verPerfil(id: number): void {
    this.router.navigate(['/mascota-detalles', id]); 
  }

  // mascota.component.ts
  limpiarFiltros(): void {
    this.nombreBusqueda = '';
    this.propietarioBusqueda = '';
    this.especieSeleccionada = 'todos';
    this.page = 1;
    this.getMascotas();
  }

}
