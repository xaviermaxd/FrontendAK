// Importa la clase Veterinario desde donde la tengas definida
import { Veterinario } from '../models/veterinario.model';

// Define la interfaz para la respuesta que incluye la paginación
export interface VeterinarioResponse {
  data: Veterinario[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
