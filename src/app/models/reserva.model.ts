// // src/app/models/reserva.model.ts
// export class Reserva {
//   constructor(
//     public ReservaID: number,
//     public MascotaID: number,
//     public HorarioID: number,
//     public Fecha: string,
//     public Nota: string,
//     public Estado: string
//   ) {}
// }

export class Reserva {
  ReservaID: number;
  TurnoID: number;
  PropietarioID: number;
  MascotaID: number;
  Notas: string;
  FechaReserva: string;
  Estado: string;
  FechaCreacion: string;

  constructor(reservaID: number, turnoID: number, propietarioID: number, mascotaID: number, notas: string, fechaReserva: string, estado: string, fechaCreacion: string) {
    this.ReservaID = reservaID;
    this.TurnoID = turnoID;
    this.PropietarioID = propietarioID;
    this.MascotaID = mascotaID;
    this.Notas = notas;
    this.FechaReserva = fechaReserva;
    this.Estado = estado;
    this.FechaCreacion = fechaCreacion;
  }
}

