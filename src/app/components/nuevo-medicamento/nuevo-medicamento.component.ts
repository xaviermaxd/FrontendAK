import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MedicamentoService } from '../../services/medicamento.service';
import { LaboratorioService } from '../../services/laboratorio.service';
import { SustanciaActivaService } from '../../services/sustancia-activa.service';
import { UsoTerapeuticoService } from '../../services/uso-terapeutico.service';
import { ViaAdministracionService } from '../../services/via-administracion.service';
import { Laboratorio } from '../../models/laboratorio.model';
import { SustanciaActiva } from '../../models/sustancia-activa.model';
import { UsoTerapeutico } from '../../models/uso-terapeutico.model';
import { ViaAdministracion } from '../../models/via-administracion.model';
import { EspecieService } from '../../services/especie.service';
import { Especie } from '../../models/especie.model';
import { PresentacionService } from '../../services/presentacion.service';
import { Presentacion } from '../../models/presentacion.model';
import { PosologiaPorEspecieService } from '../../services/posologia-por-especie.service';
import { PresentacionesMedicamentoService } from '../../services/presentaciones-medicamento.service';
import { PosologiaPorEspecie } from '../../models/posologia-por-especie.model';
import { PresentacionesMedicamento } from '../../models/presentaciones-medicamento.model';
import { PaisService } from '../../services/pais.service';
import { Pais } from '../../models/pais.model';

@Component({
  selector: 'app-nuevo-medicamento',
  templateUrl: './nuevo-medicamento.component.html',
  styleUrls: ['./nuevo-medicamento.component.css']
})
export class NuevoMedicamentoComponent implements OnInit {
  medicamentoForm: FormGroup;
  laboratorios: Laboratorio[] = [];
  sustanciasActivas: SustanciaActiva[] = [];
  usosTerapeuticos: UsoTerapeutico[] = [];
  viasAdministracion: ViaAdministracion[] = [];
  especies: Especie[] = [];
  presentaciones: Presentacion[] = [];
  paises: Pais[] = [];

  constructor(
    private fb: FormBuilder,
    private medicamentoService: MedicamentoService,
    private laboratorioService: LaboratorioService,
    private sustanciaActivaService: SustanciaActivaService,
    private usoTerapeuticoService: UsoTerapeuticoService,
    private viaAdministracionService: ViaAdministracionService,
    private especieService: EspecieService,
    private presentacionService: PresentacionService,
    private posologiaPorEspecieService: PosologiaPorEspecieService,
    private presentacionesMedicamentoService: PresentacionesMedicamentoService,
    private paisService: PaisService,
    public dialogRef: MatDialogRef<NuevoMedicamentoComponent>
  ) {
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
      foto: [null],
      documento: [null],
      posologias: this.fb.array([this.createPosologiaGroup()]),
      presentaciones: this.fb.array([this.createPresentacionGroup()])
    });
  }

  ngOnInit(): void {
    this.loadDependencies();
  }

  loadDependencies(): void {
    this.laboratorioService.getAllLaboratorios().subscribe(data => {
      this.laboratorios = data;
    });
    this.sustanciaActivaService.getAllSustanciasActivas().subscribe(data => {
      this.sustanciasActivas = data;
    });
    this.usoTerapeuticoService.getAllUsosTerapeuticos().subscribe(data => {
      this.usosTerapeuticos = data;
    });
    this.viaAdministracionService.getAllViasAdministracion().subscribe(data => {
      this.viasAdministracion = data;
    });
    this.especieService.getAllEspecies().subscribe(data => {
      this.especies = data;
    });
    this.presentacionService.getAllPresentaciones().subscribe(data => {
      this.presentaciones = data;
    });
    this.paisService.getAllPaises().subscribe(data => {
      this.paises = data;
    });
  }

  createPosologiaGroup(): FormGroup {
    return this.fb.group({
      especie_id: ['', Validators.required],
      dosificacion: ['', Validators.required]
    });
  }

  get posologias(): FormArray {
    return this.medicamentoForm.get('posologias') as FormArray;
  }

  addPosologia(): void {
    this.posologias.push(this.createPosologiaGroup());
  }

  removePosologia(index: number): void {
    if (this.posologias.length > 1) {
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
          this.posologias.removeAt(index);
          Swal.fire(
            'Eliminado!',
            'La posología ha sido eliminada.',
            'success'
          );
        }
      });
    }
  }

  createPresentacionGroup(): FormGroup {
    return this.fb.group({
      presentacion_id: ['', Validators.required],
      unidades: ['', Validators.required],
      concentracion: ['', Validators.required]
    });
  }

  get presentacionesArray(): FormArray {
    return this.medicamentoForm.get('presentaciones') as FormArray;
  }

  addPresentacion(): void {
    this.presentacionesArray.push(this.createPresentacionGroup());
  }

  removePresentacion(index: number): void {
    if (this.presentacionesArray.length > 1) {
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
          this.presentacionesArray.removeAt(index);
          Swal.fire(
            'Eliminado!',
            'La presentación ha sido eliminada.',
            'success'
          );
        }
      });
    }
  }

  onFileChange(event: any, field: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.medicamentoForm.patchValue({ [field]: file });
    }
  }

  submit() {
    if (this.medicamentoForm.invalid) {
      this.medicamentoForm.markAllAsTouched();
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos.',
        timer: 3000,
        showConfirmButton: false
      });
      return;
    }
  
    const formData = new FormData();
    Object.keys(this.medicamentoForm.value).forEach(key => {
      if (key !== 'posologias' && key !== 'presentaciones') {
        formData.append(key, this.medicamentoForm.value[key]);
      }
    });
  
    this.medicamentoService.createMedicamento(formData).subscribe(
      response => {
        const medicamentoId = response.id; // Obtén el ID del medicamento recién creado
  
        // Create posologias
        this.medicamentoForm.value.posologias.forEach((posologia: any) => {
          const newPosologia: PosologiaPorEspecie = {
            id: 0,
            medicamento_id: medicamentoId,  // Aquí asignamos el ID del medicamento recién creado
            especie_id: posologia.especie_id,
            dosificacion: posologia.dosificacion,
            habilitado: true
          };
          this.posologiaPorEspecieService.createPosologia(newPosologia).subscribe(
            response => console.log('Posología creada:', response),
            error => console.error('Error creando posología:', error)
          );
        });
  
        // Create presentaciones
        this.medicamentoForm.value.presentaciones.forEach((presentacion: any) => {
          const newPresentacion: PresentacionesMedicamento = {
            id: 0,
            medicamento_id: medicamentoId,  // Aquí asignamos el ID del medicamento recién creado
            presentacion_id: presentacion.presentacion_id,
            unidades: presentacion.unidades,
            concentracion: presentacion.concentracion,
            habilitado: true
          };
          this.presentacionesMedicamentoService.createPresentacion(newPresentacion).subscribe(
            response => console.log('Presentación creada:', response),
            error => console.error('Error creando presentación:', error)
          );
        });
  
        Swal.fire({
          icon: 'success',
          title: 'Medicamento creado',
          text: 'El medicamento ha sido creado correctamente.',
          timer: 3000,
          showConfirmButton: false
        });
  
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error creando medicamento:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear el medicamento.',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }
  

  cancel(): void {
    this.dialogRef.close();
  }
}
