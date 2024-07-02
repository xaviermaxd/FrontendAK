import { Medicamento } from '../models/medicamento.model';

export interface MedicamentoResponse {
  data: Medicamento[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}
