// mascota.model.ts

import { Propietario } from './propietario.model';
export class Mascota {
    constructor(
        public MascotaID: number,
        public PropietarioID: number,
        public Nombre: string,
        public Especie: string,
        public Raza: string,
        public Sexo: string,
        public FechaNacimiento: Date,
        public Color: string,
        public Alergias: string,
        public Habilitado: number,
        public Propietario: Propietario,
        public Foto: string | null
    ) {}
  }
  
