// propietario.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Propietario } from '../../models/propietario.model';
import { PropietarioService } from '../../services/propietario.service';
import { PropietarioResponse } from '../../interfaces/propietarioResponse';
import { NuevoPropietarioComponent } from '../nuevo-propietario/nuevo-propietario.component';
import { EditarPropietarioComponent } from '../editar-propietario/editar-propietario.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {
  propietarios!: Propietario[];
  // propietarios: Propietario[] = []; 
  nombreBusqueda = '';
  segundoNombreBusqueda = '';
  apellidoPaternoBusqueda = '';
  apellidoMaternoBusqueda = '';
  activos: number = 0;
  inactivos: number = 0;
  page = 1;
  pageSize = 5;
  totalItems = 0; // Añade totalItems para almacenar el número total de propietarios

  totalPropietarios = 0;
  habilitados = 0;
  deshabilitados = 0;


  constructor(private propietarioService: PropietarioService,  public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getPropietarios();
    this.getConteoPropietarios();
  }

  getPropietarios(): void {
    this.propietarioService.getPropietarios(this.page, this.pageSize, this.nombreBusqueda, this.segundoNombreBusqueda, this.apellidoPaternoBusqueda, this.apellidoMaternoBusqueda).subscribe((response: PropietarioResponse) => {
      this.propietarios = response.data;
      this.totalItems = response.pagination.totalItems;
    });
  }
  
  buscar(): void {
    this.page = 1;
    this.getPropietarios();
  }

  // propietario.component.ts
  agregarPropietario(): void {
    const dialogRef = this.dialog.open(NuevoPropietarioComponent, {
      width: '840px', // Ajusta el ancho del diálogo
    
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getPropietarios();
      }
    });
  }

  verPerfil(id: number): void {
    this.router.navigate(['/propietario-detalles', id]); // Navega a la página de detalles del propietario
  }


  limpiarFiltros(): void {
    this.nombreBusqueda = '';
    this.segundoNombreBusqueda = '';
    this.apellidoPaternoBusqueda = '';
    this.apellidoMaternoBusqueda = '';
    this.page = 1;
    this.getPropietarios();
  }

  getConteoPropietarios(): void {
    this.propietarioService.contarPropietarios().subscribe(data => {
      this.totalPropietarios = data.totalPropietarios;
      this.habilitados = data.habilitados;
      this.deshabilitados = data.deshabilitados;
    });
  }


}
