// src/app/interfaces/historialClinicoResponse.ts

import { HistorialClinico } from '../models/historialClinico.model';

export interface HistorialClinicoResponse {
  data: HistorialClinico[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
