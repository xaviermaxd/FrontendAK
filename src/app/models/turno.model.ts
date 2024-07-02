export class Turno {
    TurnoID: number;
    HorarioID: number;
    HoraInicio: string;
    HoraFin: string;
    Capacidad: number;
  
    constructor(turnoID: number, horarioID: number, horaInicio: string, horaFin: string, capacidad: number) {
      this.TurnoID = turnoID;
      this.HorarioID = horarioID;
      this.HoraInicio = horaInicio;
      this.HoraFin = horaFin;
      this.Capacidad = capacidad;
    }
  }
  