import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Veterinario } from '../../models/veterinario.model';
import { VeterinarioService } from '../../services/veterinario.service';
import { VeterinarioResponse } from '../../interfaces/veterinarioResponse';
import { NuevoVeterinarioComponent } from '../nuevo-veterinario/nuevo-veterinario.component';
import { EditarVeterinarioComponent } from '../editar-veterinario/editar-veterinario.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css']
})
export class VeterinarioComponent implements OnInit {
  veterinarios!: Veterinario[];
  nombreBusqueda = '';
  apellidoPaternoBusqueda = '';
  apellidoMaternoBusqueda = '';
  especialidadBusqueda = '';
  page = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(private veterinarioService: VeterinarioService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getVeterinarios();
  }

  getVeterinarios(): void {
    this.veterinarioService.getAllVeterinarios(
      this.page, this.pageSize, this.nombreBusqueda,
      this.apellidoPaternoBusqueda, this.apellidoMaternoBusqueda, this.especialidadBusqueda
    ).subscribe((response: VeterinarioResponse) => {
      this.veterinarios = response.data;
      this.totalItems = response.pagination.totalItems;
    });
  }
  
  buscar(): void {
    this.page = 1;
    this.getVeterinarios();
  }

  agregarVeterinario(): void {
    // Asume que tienes un componente dialog para agregar veterinarios
    const dialogRef = this.dialog.open(NuevoVeterinarioComponent, {
      width: '840px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVeterinarios();
      }
    });
  }

  verPerfil(id: number): void {
    this.router.navigate(['/veterinario-detalles', id]); 
  }
  

  limpiarFiltros(): void {
    this.nombreBusqueda = '';
    this.apellidoPaternoBusqueda = '';
    this.apellidoMaternoBusqueda = '';
    this.especialidadBusqueda = '';
    this.page = 1;
    this.getVeterinarios();
  }

}
