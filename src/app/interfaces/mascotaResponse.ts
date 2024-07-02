// mascotaResponse.ts
import { Mascota } from '../models/mascota.model';

export interface MascotaResponse {
  data: Mascota[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
