import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoService } from '../../services/medicamento.service';
import { PosologiaPorEspecieService } from '../../services/posologia-por-especie.service';
import { PresentacionesMedicamentoService } from '../../services/presentaciones-medicamento.service';
import { Medicamento } from '../../models/medicamento.model';
import { PosologiaPorEspecie } from '../../models/posologia-por-especie.model';
import { PresentacionesMedicamento } from '../../models/presentaciones-medicamento.model';
import { EditarMedicamentoComponent } from '../editar-medicamento/editar-medicamento.component';
import { MatDialog } from '@angular/material/dialog';
import { LaboratorioService } from '../../services/laboratorio.service';
import { UsoTerapeuticoService } from '../../services/uso-terapeutico.service';
import { ViaAdministracionService } from '../../services/via-administracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicamento-detalles',
  templateUrl: './medicamento-detalles.component.html',
  styleUrls: ['./medicamento-detalles.component.css']
})
export class MedicamentoDetallesComponent implements OnInit {
  medicamento!: Medicamento;
  posologias: PosologiaPorEspecie[] = [];
  presentaciones: PresentacionesMedicamento[] = [];
  archivoActual: string | null = null;
  tipoArchivoActual: string | null = null;
  laboratorios: any[] = [];
  usosTerapeuticos: any[] = [];
  viasAdministracion: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicamentoService: MedicamentoService,
    private posologiaPorEspecieService: PosologiaPorEspecieService,
    private presentacionesMedicamentoService: PresentacionesMedicamentoService,
    private laboratorioService: LaboratorioService,
    private usoTerapeuticoService: UsoTerapeuticoService,
    private viaAdministracionService: ViaAdministracionService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMedicamento();
    this.loadFilters();
  }

  getMedicamento(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.medicamentoService.getMedicamento(id).subscribe(
      (data: Medicamento) => {
        this.medicamento = data;
        this.loadRelatedData(id);
      },
      error => console.error('Error al obtener medicamento:', error)
    );
  }

  loadRelatedData(medicamentoId: number): void {
    this.posologiaPorEspecieService.getPosologiasPorMedicamento(medicamentoId).subscribe(
      (data: PosologiaPorEspecie[]) => this.posologias = data,
      error => console.error('Error al obtener posologías:', error)
    );

    this.presentacionesMedicamentoService.getPresentacionesPorMedicamento(medicamentoId).subscribe(
      (data: PresentacionesMedicamento[]) => this.presentaciones = data,
      error => console.error('Error al obtener presentaciones:', error)
    );
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

  verArchivo(tipo: string): void {
    if (tipo === 'foto') {
      this.archivoActual = 'http://localhost:3000/akfotos/' + (this.medicamento.foto || 'default.png');
      this.tipoArchivoActual = 'foto';
    } else if (tipo === 'documento') {
      this.archivoActual = 'http://localhost:3000/akfotos/' + (this.medicamento.documento || '');
      this.tipoArchivoActual = 'documento';
    }
  }

  editarMedicamento(medicamento: any): void {
    const dialogRef = this.dialog.open(EditarMedicamentoComponent, {
      width: '70vw', // 90% del ancho de la ventana
      maxWidth: '80vw', // Máximo 100% del ancho de la ventana
      height: '80vh', // 90% de la altura de la ventana
      maxHeight: '90vh', // Máximo 100% de la altura de la ventana
      data: { medicamento }
    });

    

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = +this.route.snapshot.paramMap.get('id')!;
        this.medicamentoService.getMedicamento(id).subscribe(
          (data: Medicamento) => {
            this.medicamento = data;
            this.loadRelatedData(id);
          },
          error => console.error('Error al obtener medicamento:', error)
        );
      }
    });
  }

  eliminarMedicamento(): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicamentoService.deleteMedicamento(this.medicamento.id).subscribe(
          () => {
            Swal.fire('Eliminado', 'El medicamento ha sido eliminado.', 'success');
            this.router.navigate(['/ruta-a-donde-redirigir-despues-de-eliminar']); // Actualiza esta ruta según tu aplicación
          },
          error => {
            console.error('Error al eliminar medicamento:', error);
            Swal.fire('Error', 'Hubo un error al eliminar el medicamento.', 'error');
          }
        );
      }
    });
  }
}
