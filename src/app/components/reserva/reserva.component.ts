import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';
import { TurnoService } from '../../services/turno.service';
import { PropietarioService } from '../../services/propietario.service';
import { MascotaService } from '../../services/mascota.service';
import { DateService } from '../../services/date.service';
import { Reserva } from '../../models/reserva.model';
import { Turno } from '../../models/turno.model';
import { Propietario } from '../../models/propietario.model';
import { Mascota } from '../../models/mascota.model';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  reservas: Reserva[] = [];
  turnos: Turno[] = [];
  propietarios: Propietario[] = [];
  mascotas: Mascota[] = [];
  reservaForm: FormGroup;
  selectedTurno: Turno | null = null;
  selectedDate: moment.Moment | null = null;
  currentWeek: moment.Moment[] = [];
  currentDate: moment.Moment;
  week: 'current' | 'next' = 'current';

  daysMap: { [key: string]: string } = {
    'lunes': '1',
    'martes': '2',
    'miércoles': '3',
    'jueves': '4',
    'viernes': '5',
    'sábado': '6',
    'domingo': '7'
  };

  hours: string[] = Array.from({ length: 14 }, (_, i) => `${i + 8}:00`);

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private turnoService: TurnoService,
    private propietarioService: PropietarioService,
    private mascotaService: MascotaService,
    public dateService: DateService
  ) {
    this.reservaForm = this.fb.group({
      TurnoID: ['', Validators.required],
      PropietarioID: ['', Validators.required],
      MascotaID: ['', Validators.required],
      Notas: ['']
    });
    this.currentDate = moment();
  }

  ngOnInit(): void {
    this.getTurnos();
    this.getPropietarios();
    this.currentWeek = this.dateService.getCurrentWeek();
  }

  getTurnos(): void {
    this.turnoService.getTurnos().subscribe(
      (data) => {
        this.turnos = data;
        this.getReservas();
      },
      (error) => {
        console.error('Error al obtener los turnos', error);
      }
    );
  }

  getPropietarios(): void {
    this.propietarioService.getPropietarios(1, 100).subscribe(
      (data) => {
        this.propietarios = data.data;
      },
      (error) => {
        console.error('Error al obtener los propietarios', error);
      }
    );
  }

  getMascotas(propietarioID: number): void {
    this.mascotaService.getMascotasPorPropietario(propietarioID, 1, 100).subscribe(
      (data) => {
        this.mascotas = data.data;
      },
      (error) => {
        console.error('Error al obtener las mascotas', error);
      }
    );
  }

  getReservas(): void {
    this.reservaService.getReservas().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al obtener las reservas', error);
      }
    );
  }

  onPropietarioChange(event: any): void {
    const propietarioID = event.target?.value;
    if (propietarioID) {
      this.getMascotas(propietarioID);
    }
  }

  selectTurno(turno: Turno, date: moment.Moment): void {
    this.selectedTurno = turno;
    this.selectedDate = date;
    this.reservaForm.patchValue({
      TurnoID: turno.TurnoID
    });
  }

  createReserva(): void {
    if (this.reservaForm.valid && this.selectedDate) {
      const newReserva: Reserva = {
        ...this.reservaForm.value,
        FechaReserva: this.dateService.formatDate(this.selectedDate)
      };

      const turno = this.turnos.find(t => t.TurnoID === newReserva.TurnoID);

      if (turno && this.getCuposDisponibles(turno, newReserva.FechaReserva) > 0) {
        this.reservaService.createReserva(newReserva).subscribe(
          (data) => {
            this.reservas.push(data);
            this.reservaForm.reset();
            this.selectedTurno = null;
            this.selectedDate = null;
            this.reservaForm.patchValue({
              TurnoID: '',
              PropietarioID: '',
              MascotaID: '',
              Notas: ''
            });
            this.getTurnos();
            this.getReservas();
            Swal.fire({
              icon: 'success',
              title: 'Reserva creada',
              text: 'La reserva se ha creado correctamente.',
              timer: 3000,
              showConfirmButton: false
            });
          },
          (error) => {
            console.error('Error al crear la reserva', error);
          }
        );
      } else {
        console.error('Capacidad del turno agotada');
        Swal.fire({
          icon: 'error',
          title: 'Capacidad agotada',
          text: 'No hay cupos disponibles para este turno.',
          timer: 3000,
          showConfirmButton: false
        });
      }
    }
  }

  getCuposDisponibles(turno: Turno, fecha: string): number {
    const reservasEnTurno = this.reservas.filter(r => r.TurnoID === turno.TurnoID && r.FechaReserva === fecha);
    return turno.Capacidad - reservasEnTurno.length;
  }

  getTurnosPorDia(date: moment.Moment): { turno: Turno, height: number, startRow: number }[] {
    const horarioID = this.daysMap[date.format('dddd').toLowerCase()];
    return this.turnos
      .filter(turno => turno.HorarioID.toString() === horarioID)
      .map(turno => {
        const startHour = moment(turno.HoraInicio, 'HH:mm:ss').hours();
        const startMinute = moment(turno.HoraInicio, 'HH:mm:ss').minutes();
        const endHour = moment(turno.HoraFin, 'HH:mm:ss').hours();
        const endMinute = moment(turno.HoraFin, 'HH:mm:ss').minutes();

        const startRow = ((startHour - 7) * 2) + (startMinute === 30 ? 2 : 1);
        const endRow = ((endHour - 7) * 2) + (endMinute === 30 ? 2 : 1);
        const height = (endRow - startRow) * 20; // Cada media hora es 25px, así que cada hora es 50px

        return { turno, height, startRow };
      });
  }

  nextWeek(): void {
    this.currentWeek = this.dateService.getNextWeek();
    this.week = 'next';
  }

  prevWeek(): void {
    this.currentWeek = this.dateService.getCurrentWeek();
    this.week = 'current';
  }

  changeWeek(week: 'current' | 'next'): void {
    if (week === 'current') {
      this.prevWeek();
    } else {
      this.nextWeek();
    }
  }

  limpiarCampos(): void {
    this.reservaForm.reset();
    this.selectedTurno = null;
    this.selectedDate = null;
    this.reservaForm.patchValue({
      TurnoID: '',
      PropietarioID: '',
      MascotaID: '',
      Notas: ''
    });
  }

  formatHora(hora: string): string {
    return moment(hora, 'HH:mm:ss').format('HH:mm');
  }

  capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  isTurnoDisabled(turno: Turno, date: moment.Moment): boolean {
    return date.isBefore(moment(), 'day') || this.getCuposDisponibles(turno, this.dateService.formatDate(date)) <= 0;
  }

  ceil(value: number): number {
    return Math.ceil(value);
  }
}
