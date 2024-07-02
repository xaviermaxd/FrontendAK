import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { Medicamento } from '../../models/medicamento.model';
import { MedicamentoService } from '../../services/medicamento.service';
import { MedicamentoResponse } from '../../interfaces/medicamentoResponse';
import { NuevoMedicamentoComponent } from '../nuevo-medicamento/nuevo-medicamento.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LaboratorioService } from '../../services/laboratorio.service';
import { UsoTerapeuticoService } from '../../services/uso-terapeutico.service';
import { ViaAdministracionService } from '../../services/via-administracion.service';
import { Laboratorio } from '../../models/laboratorio.model';
import { UsoTerapeutico } from '../../models/uso-terapeutico.model';
import { ViaAdministracion } from '../../models/via-administracion.model';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.component.html',
  styleUrls: ['./medicamento.component.css']
})
export class MedicamentoComponent implements OnInit {
  medicamentos!: Medicamento[];
  laboratorios: Laboratorio[] = [];
  usosTerapeuticos: UsoTerapeutico[] = [];
  viasAdministracion: ViaAdministracion[] = [];
  nombreBusqueda = '';
  laboratorioBusqueda = '';
  usoTerapeuticoBusqueda = '';
  viaAdministracionBusqueda = '';
  page = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(
    private medicamentoService: MedicamentoService,
    private laboratorioService: LaboratorioService,
    private usoTerapeuticoService: UsoTerapeuticoService,
    private viaAdministracionService: ViaAdministracionService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMedicamentos();
    this.loadFilters();
  }

  loadFilters(): void {
    this.laboratorioService.getAllLaboratorios().subscribe(data => {
      this.laboratorios = data;
    });
    this.usoTerapeuticoService.getAllUsosTerapeuticos().subscribe(data => {
      this.usosTerapeuticos = data;
    });
    this.viaAdministracionService.getAllViasAdministracion().subscribe(data => {
      this.viasAdministracion = data;
    });
  }

  getMedicamentos(): void {
    this.medicamentoService.getAllMedicamentos(
      this.page, this.pageSize, this.nombreBusqueda, this.laboratorioBusqueda, this.usoTerapeuticoBusqueda, this.viaAdministracionBusqueda
    ).subscribe((response: MedicamentoResponse) => {
      this.medicamentos = response.data;
      this.totalItems = response.pagination.totalItems;
    });
  }
  
  buscar(): void {
    this.page = 1;
    this.getMedicamentos();
  }

  agregarMedicamento(): void {
    const dialogRef = this.dialog.open(NuevoMedicamentoComponent, {
      width: '80vw',
      maxWidth: '90vw',
      height: '80vh',
      maxHeight: '90vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getMedicamentos();
      }
    });
}

  

  verDetalle(id: number): void {
    this.router.navigate(['/medicamento-detalles', id]); 
  }

  limpiarFiltros(): void {
    this.nombreBusqueda = '';
    this.laboratorioBusqueda = '';
    this.usoTerapeuticoBusqueda = '';
    this.viaAdministracionBusqueda = '';
    this.page = 1;
    this.getMedicamentos();
  }
}
