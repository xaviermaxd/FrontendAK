// src/app/models/propietario.model.ts
export class Propietario {
  constructor(
    public PropietarioID: number,
    public Nombre: string,
    public SegundoNombre: string | null,
    public ApellidoPaterno: string,
    public ApellidoMaterno: string,
    public Direccion: string,
    public Telefono: string,
    public CorreoElectronico: string,
    public Habilitado: number,
    public DNI: string | null,
    public Foto: string | null 
  ) {}
}
