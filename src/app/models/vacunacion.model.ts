import { Mascota } from './mascota.model';
import { Veterinario } from './veterinario.model';

export class Vacunacion {
  constructor(
    public id: number,
    public fecha_aplicacion: Date, // Tipo Date para manejar fecha y hora
    public peso: number,
    public frecuencia_cardiaca: number,
    public frecuencia_respiratoria: number,
    public temperatura: number,
    public recordatorio: boolean,
    public fecha_proxima_visita: Date | null, // Tipo Date para manejar fecha y hora o null
    public mascota_id: number,
    public veterinario_id: number,
    public habilitado: boolean,
    public Mascota?: Mascota,
    public Veterinario?: Veterinario
  ) {}
}
