import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models/turno.model';
import { HorarioService } from '../../services/horario.service';
import { Horario } from '../../interfaces/horario.interface';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

@Component({
  selector: 'app-turno',
  templateUrl: './turno.component.html',
  styleUrls: ['./turno.component.css']
})
export class TurnoComponent implements OnInit {
  turnos: Turno[] = [];
  horarios: Horario[] = [];
  turnoForm: FormGroup;
  diasSemana: string[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'];

  constructor(
    private fb: FormBuilder,
    private turnoService: TurnoService,
    private horarioService: HorarioService
  ) {
    this.turnoForm = this.fb.group({
      HorarioID: ['', Validators.required],
      HoraInicio: ['', Validators.required],
      HoraFin: ['', Validators.required],
      Capacidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.getTurnos();
    this.getHorarios();
  }

  getTurnos(): void {
    this.turnoService.getTurnos().subscribe(
      (data) => {
        this.turnos = data;
      },
      (error) => {
        console.error('Error al obtener los turnos', error);
      }
    );
  }

  getHorarios(): void {
    this.horarioService.getHorarios().subscribe(
      (data) => {
        this.horarios = data;
      },
      (error) => {
        console.error('Error al obtener los horarios', error);
      }
    );
  }

  createTurno(): void {
    if (this.turnoForm.valid) {
      const newTurno: Turno = this.turnoForm.value;
      this.turnoService.createTurno(newTurno).subscribe(
        (data) => {
          this.turnos.push(data);
          this.turnoForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Turno creado',
            text: 'El turno se ha creado correctamente.',
            timer: 3000,
            showConfirmButton: false
          });
        },
        (error) => {
          console.error('Error al crear el turno', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear el turno.',
            timer: 3000,
            showConfirmButton: false
          });
        }
      );
    }
  }

  limpiarCampos(): void {
    this.turnoForm.reset();
  }

  getTurnosPorDia(dia: string): Turno[] {
    const horarioID = this.horarios.find(h => h.Dia.toLowerCase() === dia)?.HorarioID;
    return this.turnos.filter(turno => turno.HorarioID === horarioID);
  }

  formatHora(hora: string): string {
    return moment(hora, 'HH:mm:ss').format('HH:mm');
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
