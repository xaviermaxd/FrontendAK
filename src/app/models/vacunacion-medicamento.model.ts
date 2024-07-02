import { Vacunacion } from './vacunacion.model';
import { Medicamento } from './medicamento.model';

export class VacunacionMedicamento {
  constructor(
    public id: number,
    public vacunacion_id: number,
    public medicamento_id: number,
    public dosis: string,
    public lote: string,
    public habilitado: boolean,
    public Vacunacion?: Vacunacion,
    public Medicamento?: Medicamento
  ) {}
}
