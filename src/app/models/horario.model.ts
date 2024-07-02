// horario.model.ts
export class Horario {
  constructor(
    public HorarioID: number,
    public Dia: string,
    public HoraInicio: string,
    public HoraFin: string,
    public Capacidad: number
  ) {}
}
