import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacunacionService } from '../../services/vacunacion.service';
import { VacunacionMedicamentoService } from '../../services/vacunacion-medicamento.service';
import { MedicamentoService } from '../../services/medicamento.service';
import { VeterinarioService } from '../../services/veterinario.service';
import { Medicamento } from '../../models/medicamento.model';
import { Mascota } from '../../models/mascota.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-vacunacion',
  templateUrl: './nuevo-vacunacion.component.html',
  styleUrls: ['./nuevo-vacunacion.component.css']
})
export class NuevoVacunacionComponent implements OnInit {
  vacunacionForm: FormGroup;
  medicamentos: Medicamento[] = [];
  submitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private vacunacionService: VacunacionService,
    private vacunacionMedicamentoService: VacunacionMedicamentoService,
    private medicamentoService: MedicamentoService,
    private veterinarioService: VeterinarioService,
    private dialogRef: MatDialogRef<NuevoVacunacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota,
  ) {
    this.vacunacionForm = this.fb.group({
      fecha_aplicacion: [this.getFechaAplicacionPeru(), Validators.required],
      peso: ['', Validators.required],
      frecuencia_cardiaca: [''],
      frecuencia_respiratoria: [''],
      temperatura: ['', Validators.required],
      recordatorio: [false],
      fecha_proxima_visita: [''],
      mascota_id: [this.data.MascotaID, Validators.required],
      veterinario_id: [this.veterinarioService.getUsuarioId(), Validators.required],
      habilitado: [true],
      medicamentos: this.fb.array([this.createMedicamentoGroup()])
    });
  }

  ngOnInit(): void {
    console.log(this.veterinarioService.getUsuarioId());
    console.log(this.data.MascotaID);

    this.medicamentoService.getAllMedicamentos(1, 100, '', '', 'vacuna', '').subscribe(
      response => this.medicamentos = response.data,
      error => console.error('Error al obtener medicamentos:', error)
    );
  }

  getFechaAplicacionPeru(): string {
    const now = new Date();
    const offset = 0; // UTC-5
    const peruTime = new Date(now.getTime() + (offset - now.getTimezoneOffset()) * 60000);
    return peruTime.toISOString().substring(0, 16);
  }

  createMedicamentoGroup(): FormGroup {
    return this.fb.group({
      medicamento_id: ['', Validators.required],
      dosis: ['', Validators.required],
      lote: ['', Validators.required],
    });
  }

  get medicamentosArray(): FormArray {
    return this.vacunacionForm.get('medicamentos') as FormArray;
  }

  addMedicamento(): void {
    this.medicamentosArray.push(this.createMedicamentoGroup());
  }

  removeMedicamento(index: number): void {
    if (this.medicamentosArray.length > 1) {
      this.medicamentosArray.removeAt(index);
    }
  }

  submit(): void {
    if (this.submitting) {
      return;
    }
    this.submitting = true;

    if (this.vacunacionForm.valid) {
      const vacunacionData = this.vacunacionForm.value;
      console.log('Datos de vacunación a enviar:', vacunacionData);

      this.vacunacionService.createVacunacion(vacunacionData).subscribe(
        response => {
          const vacunacionId = response.id;
          const medicamentosData = vacunacionData.medicamentos.map((medicamento: any) => ({
            vacunacion_id: vacunacionId,
            medicamento_id: medicamento.medicamento_id,
            dosis: medicamento.dosis,
            lote: medicamento.lote,
            habilitado: true
          }));

          console.log('Datos de medicamentos a enviar:', medicamentosData);

          let requests = medicamentosData.map((medicamentoData: any) =>
            this.vacunacionMedicamentoService.createVacunacionMedicamento(medicamentoData).toPromise()
          );

          Promise.all(requests).then(() => {
            this.submitting = false;
            Swal.fire('Registrado', 'La vacunación ha sido registrada.', 'success');
            this.dialogRef.close(true);
          }).catch(error => {
            this.submitting = false;
            Swal.fire('Error', 'Hubo un error al registrar los medicamentos de la vacunación.', 'error');
            console.error('Error creando Vacunación-Medicamento:', error);
          });
        },
        error => {
          this.submitting = false;
          Swal.fire('Error', 'Hubo un error al registrar la vacunación.', 'error');
          console.error('Error creando vacunación:', error);
        }
      );
    } else {
      this.submitting = false;
      this.vacunacionForm.markAllAsTouched();
      const invalidFields = this.getInvalidFields(this.vacunacionForm);
      // Swal.fire('Error', `Por favor, completa todos los campos requeridos. Campos faltantes: ${invalidFields.join(', ')}`, 'error');
      Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'error');
    }
  }

  getInvalidFields(form: FormGroup | FormArray): string[] {
    const invalidFields: string[] = [];
    Object.keys(form.controls).forEach(key => {
      const control = form.get(key);
      if (control instanceof FormGroup || control instanceof FormArray) {
        invalidFields.push(...this.getInvalidFields(control));
      } else if (control && control.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}