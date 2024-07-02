// propietario-response.ts
import { Propietario } from '../models/propietario.model';

export interface PropietarioResponse {
  data: Propietario[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
