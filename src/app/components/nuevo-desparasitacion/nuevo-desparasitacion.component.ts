import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DesparasitacionService } from '../../services/desparasitacion.service';
import { DesparasitacionMedicamentoService } from '../../services/desparasitacion-medicamento.service';
import { MedicamentoService } from '../../services/medicamento.service';
import { VeterinarioService } from '../../services/veterinario.service';
import { Medicamento } from '../../models/medicamento.model';
import { Mascota } from '../../models/mascota.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-desparasitacion',
  templateUrl: './nuevo-desparasitacion.component.html',
  styleUrls: ['./nuevo-desparasitacion.component.css']
})
export class NuevoDesparasitacionComponent implements OnInit {
  desparasitacionForm: FormGroup;
  medicamentos: Medicamento[] = [];

  constructor(
    private fb: FormBuilder,
    private desparasitacionService: DesparasitacionService,
    private desparasitacionMedicamentoService: DesparasitacionMedicamentoService,
    private medicamentoService: MedicamentoService,
    private veterinarioService: VeterinarioService,
    private dialogRef: MatDialogRef<NuevoDesparasitacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota,
  ) {
    this.desparasitacionForm = this.fb.group({
      fecha_aplicacion: [this.getFechaAplicacionPeru(), Validators.required],
      peso: ['', Validators.required],
      recordatorio: [false],
      fecha_proxima_visita: [''],
      mascota_id: [this.data.MascotaID, Validators.required],
      veterinario_id: [this.veterinarioService.getUsuarioId(), Validators.required],
      habilitado: [true],
      medicamentos: this.fb.array([this.createMedicamentoGroup()])
    });
  }

  ngOnInit(): void {
    this.medicamentoService.getAllMedicamentos(1, 100, '', '', 'desparasitante', '').subscribe(
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
    return this.desparasitacionForm.get('medicamentos') as FormArray;
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
    if (this.desparasitacionForm.valid) {
      const desparasitacionData = this.desparasitacionForm.value;
      console.log('Datos de desparasitación a enviar:', desparasitacionData);
      this.desparasitacionService.createDesparasitacion(desparasitacionData).subscribe(
        response => {
          const desparasitacionId = response.id;
          const medicamentosData = desparasitacionData.medicamentos.map((medicamento: any) => ({
            desparasitacion_id: desparasitacionId,
            medicamento_id: medicamento.medicamento_id,
            dosis: medicamento.dosis,
            lote: medicamento.lote,
            habilitado: true
          }));

          console.log('Datos de medicamentos a enviar:', medicamentosData);

          let requests = medicamentosData.map((medicamentoData: any) => 
            this.desparasitacionMedicamentoService.createDesparasitacionMedicamento(medicamentoData).toPromise()
          );

          Promise.all(requests).then(() => {
            Swal.fire('Registrado', 'La desparasitación ha sido registrada.', 'success');
            this.dialogRef.close(true);
          }).catch(error => {
            Swal.fire('Error', 'Hubo un error al registrar los medicamentos de la desparasitación.', 'error');
            console.error('Error creando Desparasitacion-Medicamento:', error);
          });
        },
        error => {
          Swal.fire('Error', 'Hubo un error al registrar la desparasitación.', 'error');
          console.error('Error creando desparasitación:', error);
        }
      );
    } else {
      this.desparasitacionForm.markAllAsTouched();
      Swal.fire('Error', 'Por favor, completa todos los campos requeridos.', 'error');
    }
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
