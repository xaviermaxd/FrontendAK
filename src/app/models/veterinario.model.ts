// src/app/models/veterinario.model.ts
export class Veterinario {
  constructor(
    public VeterinarioID: number,
    public Nombre: string,
    public ApellidoPaterno: string, 
    public ApellidoMaterno: string, 
    public Usuario: string,
    public Especialidad: string,
    public Telefono: string,
    public CorreoElectronico: string,
    public Habilitado: boolean,
    public Rol: number, 
    public DNI: string,
    public FotoVeterinario?: string, // Campo opcional
    public FotoDNI?: string,         // Campo opcional
    public CurriculumVitae?: string  // Campo opcional
  ) {}
}

  