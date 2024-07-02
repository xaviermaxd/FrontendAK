import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoGeneralService } from '../../services/estado-general.service';
import { StatusMentalService } from '../../services/status-mental.service';
import { TemperamentoService } from '../../services/temperamento.service';
import { ComportamientoService } from '../../services/comportamiento.service';
import { CondicionCorporalService } from '../../services/condicion-corporal.service';
import { PatronFCService } from '../../services/patron-fc.service';
import { PatronFRService } from '../../services/patron-fr.service';
import { PulsoService } from '../../services/pulso.service';
import { MucosasService } from '../../services/mucosas.service';
import { TiempoLlenadoCapilarService } from '../../services/tiempo-llenado-capilar.service';
import { EstadoHidratacionService } from '../../services/estado-hidratacion.service';
import { ConsultaMedicaService } from '../../services/consulta-medica.service';
import { VeterinarioService } from '../../services/veterinario.service';
import { SistemasService } from '../../services/sistemas.service';
import { ListaProblemasService } from '../../services/lista-problemas.service';
import { MotivoConsultaService } from '../../services/motivo-consulta.service';
import { ExamenesMedicosService } from '../../services/examenesMedicos.service';
import { ExamenesConsultasService } from '../../services/examenesConsultas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-consulta-medica',
  templateUrl: './nuevo-consulta-medica.component.html',
  styleUrls: ['./nuevo-consulta-medica.component.css']
})
export class NuevoConsultaMedicaComponent implements OnInit {
  consultaMedicaForm: FormGroup;
  estadoGenerales: any[] = [];
  statusMentales: any[] = [];
  temperamentos: any[] = [];
  comportamientos: any[] = [];
  condicionCorporales: any[] = [];
  patronFCs: any[] = [];
  patronFRs: any[] = [];
  pulsos: any[] = [];
  mucosas: any[] = [];
  tiempoLlenadoCapilares: any[] = [];
  estadoHidrataciones: any[] = [];
  sistemas: any[] = [];
  examenesMedicos: any[] = [];
  submitting: boolean = false;
  mascotaId: number;
  currentStep = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private estadoGeneralService: EstadoGeneralService,
    private statusMentalService: StatusMentalService,
    private temperamentoService: TemperamentoService,
    private comportamientoService: ComportamientoService,
    private condicionCorporalService: CondicionCorporalService,
    private patronFCService: PatronFCService,
    private patronFRService: PatronFRService,
    private pulsoService: PulsoService,
    private mucosasService: MucosasService,
    private tiempoLlenadoCapilarService: TiempoLlenadoCapilarService,
    private estadoHidratacionService: EstadoHidratacionService,
    private consultaMedicaService: ConsultaMedicaService,
    private veterinarioService: VeterinarioService,
    private sistemasService: SistemasService,
    private listaProblemasService: ListaProblemasService,
    private motivoConsultaService: MotivoConsultaService,
    private examenesMedicosService: ExamenesMedicosService,
    private examenesConsultasService: ExamenesConsultasService
  ) {
    this.mascotaId = +this.route.snapshot.paramMap.get('id')!;

    this.consultaMedicaForm = this.fb.group({
      fecha_consulta: [this.getFechaAplicacionPeru(), Validators.required],
      curso: ['', Validators.required],
      tiempo: ['', Validators.required],
      descripcion_propietario: ['', Validators.required],
      estado_general_id: [''],
      status_mental_id: [''],
      temperamento_id: [''],
      comportamiento_id: [''],
      condicion_corporal_id: [''],
      patron_fc_id: ['', Validators.required],
      frecuencia_cardiaca: ['', Validators.required],
      patron_fr_id: ['', Validators.required],
      frecuencia_respiratoria: ['', Validators.required],
      glucemia: [''],
      pas: [''],
      pad: [''],
      pam: [''],
      pulso_id: [''],
      peso: ['', Validators.required],
      temperatura: ['', Validators.required],
      mucosas_id: [''],
      tiempo_llenado_capilar_id: [''],
      estado_hidratacion_id: [''],
      necesita_examenes: [false, Validators.required],
      realizo_tratamientos: [false, Validators.required],
      descripcion_tratamiento: [''],
      diagnostico_presuntivo: [''],
      observaciones_adicionales: [''],
      mascota_id: [this.mascotaId, Validators.required],
      veterinario_id: [this.veterinarioService.getUsuarioId(), Validators.required],
      habilitado: [true],
      listaProblemas: this.fb.array([this.createListaProblemasGroup()]),
      motivoConsultas: this.fb.array([this.createMotivoConsultaGroup()]),
      examenesConsultas: this.fb.array([])  // Nuevo FormArray para exámenes
    });
  }

  ngOnInit(): void {
    this.cargarDatos();

      // Escuchar cambios en necesita_examenes para agregar el primer grupo de exámenes automáticamente
  this.consultaMedicaForm.get('necesita_examenes')?.valueChanges.subscribe(value => {
    if (value && this.examenesConsultasArray.length === 0) {
      this.addExamenesConsultas();
    }
  });

  // Escuchar cambios en realizo_tratamientos para agregar la validación de descripcion_tratamiento
  this.consultaMedicaForm.get('realizo_tratamientos')?.valueChanges.subscribe(value => {
    if (value) {
      this.consultaMedicaForm.get('descripcion_tratamiento')?.setValidators(Validators.required);
    } else {
      this.consultaMedicaForm.get('descripcion_tratamiento')?.clearValidators();
    }
    this.consultaMedicaForm.get('descripcion_tratamiento')?.updateValueAndValidity();
  });
  }

  getFechaAplicacionPeru(): string {
    const now = new Date();
    const offset = -5 * 60; // UTC-5
    const peruTime = new Date(now.getTime() + (offset - now.getTimezoneOffset()) * 60000);
    return peruTime.toISOString().substring(0, 16);
  }

  cargarDatos(): void {
    this.estadoGeneralService.getAllEstadoGeneral().subscribe(data => this.estadoGenerales = data);
    this.statusMentalService.getAllStatusMental().subscribe(data => this.statusMentales = data);
    this.temperamentoService.getAllTemperamento().subscribe(data => this.temperamentos = data);
    this.comportamientoService.getAllComportamiento().subscribe(data => this.comportamientos = data);
    this.condicionCorporalService.getAllCondicionCorporal().subscribe(data => this.condicionCorporales = data);
    this.patronFCService.getAllPatronFC().subscribe(data => this.patronFCs = data);
    this.patronFRService.getAllPatronFR().subscribe(data => this.patronFRs = data);
    this.pulsoService.getAllPulso().subscribe(data => this.pulsos = data);
    this.mucosasService.getAllMucosas().subscribe(data => this.mucosas = data);
    this.tiempoLlenadoCapilarService.getAllTiempoLlenadoCapilar().subscribe(data => this.tiempoLlenadoCapilares = data);
    this.estadoHidratacionService.getAllEstadoHidratacion().subscribe(data => this.estadoHidrataciones = data);
    this.sistemasService.getAllSistemas().subscribe(data => this.sistemas = data);
    this.examenesMedicosService.getAllExamenesMedicos().subscribe(data => this.examenesMedicos = data);
  }

  createListaProblemasGroup(): FormGroup {
    return this.fb.group({
      sistema_id: ['', Validators.required],
      hallazgo_fisico: ['', Validators.required],
      observacion: ['', Validators.required],
    });
  }

  createMotivoConsultaGroup(): FormGroup {
    return this.fb.group({
      descripcion: ['', Validators.required],
    });
  }

  createExamenesConsultasGroup(): FormGroup {
    return this.fb.group({
      examen_medico_id: ['', Validators.required],
      observacion: ['', Validators.required]
    });
  }

  get listaProblemasArray(): FormArray {
    return this.consultaMedicaForm.get('listaProblemas') as FormArray;
  }

  get motivoConsultasArray(): FormArray {
    return this.consultaMedicaForm.get('motivoConsultas') as FormArray;
  }

  get examenesConsultasArray(): FormArray {
    return this.consultaMedicaForm.get('examenesConsultas') as FormArray;
  }

  addListaProblemas(): void {
    this.listaProblemasArray.push(this.createListaProblemasGroup());
  }

  removeListaProblemas(index: number): void {
    if (this.listaProblemasArray.length > 1) {
      this.listaProblemasArray.removeAt(index);
    }
  }

  addMotivoConsulta(): void {
    this.motivoConsultasArray.push(this.createMotivoConsultaGroup());
  }

  removeMotivoConsulta(index: number): void {
    if (this.motivoConsultasArray.length > 1) {
      this.motivoConsultasArray.removeAt(index);
    }
  }

  addExamenesConsultas(): void {
    this.examenesConsultasArray.push(this.createExamenesConsultasGroup());
  }

  removeExamenesConsultas(index: number): void {
    if (this.examenesConsultasArray.length > 1) {
      this.examenesConsultasArray.removeAt(index);
    }
  }

  submit(): void {
    if (this.submitting) {
      return;
    }
    this.submitting = true;

    if (this.consultaMedicaForm.valid) {
      const consultaMedicaData = this.consultaMedicaForm.value;
      console.log('Datos de consulta médica a enviar:', consultaMedicaData);

      this.consultaMedicaService.createConsultaMedica(consultaMedicaData).subscribe(
        response => {
          const consultaMedicaId = response.id;
          const listaProblemasData = consultaMedicaData.listaProblemas.map((problema: any) => ({
            consulta_medica_id: consultaMedicaId,
            sistema_id: problema.sistema_id,
            hallazgo_fisico: problema.hallazgo_fisico,
            observacion: problema.observacion,
            habilitado: true
          }));

          const motivoConsultasData = consultaMedicaData.motivoConsultas.map((motivo: any) => ({
            consulta_medica_id: consultaMedicaId,
            descripcion: motivo.descripcion,
            habilitado: true
          }));

          const examenesConsultasData = consultaMedicaData.examenesConsultas.map((examen: any) => ({
            consulta_medica_id: consultaMedicaId,
            examen_medico_id: examen.examen_medico_id,
            observacion: examen.observacion,
            habilitado: true
          }));

          let requests = [
            ...listaProblemasData.map((problemaData: any) =>
              this.listaProblemasService.createListaProblemas(problemaData).toPromise()
            ),
            ...motivoConsultasData.map((motivoData: any) =>
              this.motivoConsultaService.createMotivoConsulta(motivoData).toPromise()
            ),
            ...examenesConsultasData.map((examenData: any) =>
              this.examenesConsultasService.createExamenesConsultas(examenData).toPromise()
            )
          ];

          Promise.all(requests).then(() => {
            this.submitting = false;
            Swal.fire('Registrado', 'La consulta médica ha sido registrada.', 'success');
            this.router.navigate(['/consulta-medica-detalles', consultaMedicaId]);
          }).catch(error => {
            this.submitting = false;
            Swal.fire('Error', 'Hubo un error al registrar los detalles de la consulta médica.', 'error');
            console.error('Error creando detalles de Consulta Médica:', error);
          });
        },
        error => {
          this.submitting = false;
          Swal.fire('Error', 'Hubo un error al registrar la consulta médica.', 'error');
          console.error('Error creando consulta médica:', error);
        }
      );
    } else {
      this.submitting = false;
      this.consultaMedicaForm.markAllAsTouched();
      const invalidFields = this.getInvalidFields(this.consultaMedicaForm);
      Swal.fire('Error', `Por favor, completa todos los campos requeridos. Campos faltantes: ${invalidFields.join(', ')}`, 'error');
      
    }
  }

  getInvalidFields(form: FormGroup | FormArray): string[] {
    const invalidFields: string[] = [];
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        invalidFields.push(...this.getInvalidFields(control as FormGroup | FormArray));
      } else if (control && control.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }

  cancel(): void {
    this.router.navigate(['/mascota-detalles', this.mascotaId]);
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }
}
