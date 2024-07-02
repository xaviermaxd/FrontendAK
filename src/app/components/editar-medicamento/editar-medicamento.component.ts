import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MedicamentoService } from '../../services/medicamento.service';
import { PosologiaPorEspecieService } from '../../services/posologia-por-especie.service';
import { PresentacionesMedicamentoService } from '../../services/presentaciones-medicamento.service';
import { Medicamento } from '../../models/medicamento.model';
import { PosologiaPorEspecie } from '../../models/posologia-por-especie.model';
import { PresentacionesMedicamento } from '../../models/presentaciones-medicamento.model';
import { LaboratorioService } from '../../services/laboratorio.service';
import { UsoTerapeuticoService } from '../../services/uso-terapeutico.service';
import { ViaAdministracionService } from '../../services/via-administracion.service';
import { PaisService } from '../../services/pais.service';
import { EspecieService } from '../../services/especie.service';
import { PresentacionService } from '../../services/presentacion.service';
import { SustanciaActivaService } from '../../services/sustancia-activa.service';
import { Laboratorio } from '../../models/laboratorio.model';
import { UsoTerapeutico } from '../../models/uso-terapeutico.model';
import { ViaAdministracion } from '../../models/via-administracion.model';
import { Pais } from '../../models/pais.model';
import { Especie } from '../../models/especie.model';
import { Presentacion } from '../../models/presentacion.model';
import { SustanciaActiva } from '../../models/sustancia-activa.model';

@Component({
  selector: 'app-editar-medicamento',
  templateUrl: './editar-medicamento.component.html',
  styleUrls: ['./editar-medicamento.component.css']
})
export class EditarMedicamentoComponent implements OnInit {
  medicamentoForm!: FormGroup;
  laboratorios: Laboratorio[] = [];
  usosTerapeuticos: UsoTerapeutico[] = [];
  viasAdministracion: ViaAdministracion[] = [];
  paises: Pais[] = [];
  especies: Especie[] = [];
  presentaciones: Presentacion[] = [];
  sustanciasActivas: SustanciaActiva[] = [];

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private posologiaPorEspecieService: PosologiaPorEspecieService,
    private presentacionesMedicamentoService: PresentacionesMedicamentoService,
    private laboratorioService: LaboratorioService,
    private usoTerapeuticoService: UsoTerapeuticoService,
    private viaAdministracionService: ViaAdministracionService,
    private paisService: PaisService,
    private especieService: EspecieService,
    private presentacionService: PresentacionService,
    private sustanciaActivaService: SustanciaActivaService,
    private dialogRef: MatDialogRef<EditarMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { medicamento: Medicamento }
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.loadInitialData();
  }

  createForm(): void {
    this.medicamentoForm = this.fb.group({
      nombre: ['', Validators.required],
      laboratorio_id: ['', Validators.required],
      pais_id: [''],
      registro_sanitario: [''],
      sustancia_id: ['', Validators.required],
      uso_terapeutico_id: ['', Validators.required],
      composicion: [''],
      indicaciones: [''],
      contraindicaciones: [''],
      precauciones: [''],
      reacciones_adversas: [''],
      via_administracion_id: ['', Validators.required],
      url: [''],
      foto: [''],
      documento: [''],
      posologias: this.fb.array([]),
      presentaciones: this.fb.array([])
    });

    this.populateForm(this.data.medicamento);
  }

  loadInitialData(): void {
    this.laboratorioService.getAllLaboratorios().subscribe(data => this.laboratorios = data);
    this.usoTerapeuticoService.getAllUsosTerapeuticos().subscribe(data => this.usosTerapeuticos = data);
    this.viaAdministracionService.getAllViasAdministracion().subscribe(data => this.viasAdministracion = data);
    this.paisService.getAllPaises().subscribe(data => this.paises = data);
    this.especieService.getAllEspecies().subscribe(data => this.especies = data);
    this.presentacionService.getAllPresentaciones().subscribe(data => this.presentaciones = data);
    this.sustanciaActivaService.getAllSustanciasActivas().subscribe(data => this.sustanciasActivas = data);

    const medicamentoId = this.data.medicamento.id;
    this.posologiaPorEspecieService.getPosologiasPorMedicamento(medicamentoId).subscribe(data => {
      data.forEach(posologia => this.addPosologia(posologia));
    });
    this.presentacionesMedicamentoService.getPresentacionesPorMedicamento(medicamentoId).subscribe(data => {
      data.forEach(presentacion => this.addPresentacion(presentacion));
    });
  }

  populateForm(medicamento: Medicamento): void {
    this.medicamentoForm.patchValue({
      nombre: medicamento.nombre,
      laboratorio_id: medicamento.laboratorio_id,
      pais_id: medicamento.pais_id,
      registro_sanitario: medicamento.registro_sanitario,
      sustancia_id: medicamento.sustancia_id,
      uso_terapeutico_id: medicamento.uso_terapeutico_id,
      composicion: medicamento.composicion,
      indicaciones: medicamento.indicaciones,
      contraindicaciones: medicamento.contraindicaciones,
      precauciones: medicamento.precauciones,
      reacciones_adversas: medicamento.reacciones_adversas,
      via_administracion_id: medicamento.via_administracion_id,
      url: medicamento.url,
      foto: medicamento.foto,
      documento: medicamento.documento
    });
  }

  get posologias(): FormArray {
    return this.medicamentoForm.get('posologias') as FormArray;
  }

  addPosologia(posologia?: PosologiaPorEspecie): void {
    const posologiaGroup = this.fb.group({
      id: [posologia ? posologia.id : 0],
      especie_id: [posologia ? posologia.especie_id : '', Validators.required],
      dosificacion: [posologia ? posologia.dosificacion : '', Validators.required]
    });
    this.posologias.push(posologiaGroup);
  }

  removePosologia(index: number): void {
    const posologiaId = this.posologias.at(index).value.id;
    if (posologiaId) {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'No podrá revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.posologiaPorEspecieService.eliminarPosologia(posologiaId).subscribe(
            () => {
              this.posologias.removeAt(index);
              Swal.fire(
                'Eliminado!',
                'La posología ha sido eliminada.',
                'success'
              );
            },
            error => {
              console.error('Error al eliminar posología:', error);
              Swal.fire(
                'Error!',
                'Hubo un error al eliminar la posología.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'La posología está segura :)',
            'error'
          );
        }
      });
    } else {
      this.posologias.removeAt(index);
    }
  }

  get presentacionesArray(): FormArray {
    return this.medicamentoForm.get('presentaciones') as FormArray;
  }

  addPresentacion(presentacion?: PresentacionesMedicamento): void {
    const presentacionGroup = this.fb.group({
      id: [presentacion ? presentacion.id : 0],
      presentacion_id: [presentacion ? presentacion.presentacion_id : '', Validators.required],
      unidades: [presentacion ? presentacion.unidades : '', Validators.required],
      concentracion: [presentacion ? presentacion.concentracion : '', Validators.required]
    });
    this.presentacionesArray.push(presentacionGroup);
  }

  removePresentacion(index: number): void {
    const presentacionId = this.presentacionesArray.at(index).value.id;
    if (presentacionId) {
      Swal.fire({
        title: '¿Está seguro?',
        text: 'No podrá revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.presentacionesMedicamentoService.eliminarPresentacion(presentacionId).subscribe(
            () => {
              this.presentacionesArray.removeAt(index);
              Swal.fire(
                'Eliminado!',
                'La presentación ha sido eliminada.',
                'success'
              );
            },
            error => {
              console.error('Error al eliminar presentación:', error);
              Swal.fire(
                'Error!',
                'Hubo un error al eliminar la presentación.',
                'error'
              );
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'La presentación está segura :)',
            'error'
          );
        }
      });
    } else {
      this.presentacionesArray.removeAt(index);
    }
  }

  onFileChange(event: any, field: string): void {
    const file = event.target.files[0];
    if (file) {
      this.medicamentoForm.patchValue({ [field]: file });
    }
  }

  submit(): void {
    if (this.medicamentoForm.valid) {
      const formData = new FormData();
      Object.keys(this.medicamentoForm.value).forEach(key => {
        if (key !== 'posologias' && key !== 'presentaciones') {
          formData.append(key, this.medicamentoForm.value[key]);
        }
      });

      this.medicamentoService.updateMedicamento(this.data.medicamento.id, formData).subscribe(
        response => {
          const medicamentoId = this.data.medicamento.id;

          // Update posologias
          this.posologias.controls.forEach((posologia: any) => {
            const newPosologia: PosologiaPorEspecie = {
              id: posologia.value.id,
              medicamento_id: medicamentoId,
              especie_id: posologia.value.especie_id,
              dosificacion: posologia.value.dosificacion,
              habilitado: true
            };
            if (newPosologia.id) {
              this.posologiaPorEspecieService.updatePosologia(newPosologia.id, newPosologia).subscribe(
                response => console.log('Posología actualizada:', response),
                error => console.error('Error actualizando posología:', error)
              );
            } else {
              this.posologiaPorEspecieService.createPosologia(newPosologia).subscribe(
                response => console.log('Posología creada:', response),
                error => console.error('Error creando posología:', error)
              );
            }
          });

          // Update presentaciones
          this.presentacionesArray.controls.forEach((presentacion: any) => {
            const newPresentacion: PresentacionesMedicamento = {
              id: presentacion.value.id,
              medicamento_id: medicamentoId,
              presentacion_id: presentacion.value.presentacion_id,
              unidades: presentacion.value.unidades,
              concentracion: presentacion.value.concentracion,
              habilitado: true
            };
            if (newPresentacion.id) {
              this.presentacionesMedicamentoService.updatePresentacion(newPresentacion.id, newPresentacion).subscribe(
                response => console.log('Presentación actualizada:', response),
                error => console.error('Error actualizando presentación:', error)
              );
            } else {
              this.presentacionesMedicamentoService.createPresentacion(newPresentacion).subscribe(
                response => console.log('Presentación creada:', response),
                error => console.error('Error creando presentación:', error)
              );
            }
          });

          Swal.fire({
            icon: 'success',
            title: 'Medicamento actualizado',
            text: 'El medicamento ha sido actualizado correctamente.',
            timer: 3000,
            showConfirmButton: false
          });

          this.dialogRef.close(true);
        },
        error => {
          console.error('Error actualizando medicamento:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un error al actualizar el medicamento.',
            timer: 3000,
            showConfirmButton: false
          });
        }
      );
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
