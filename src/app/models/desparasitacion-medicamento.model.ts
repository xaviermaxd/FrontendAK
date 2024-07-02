import { Desparasitacion } from './desparasitacion.model';
import { Medicamento } from './medicamento.model';

export class DesparasitacionMedicamento {
  constructor(
    public id: number,
    public desparasitacion_id: number,
    public medicamento_id: number,
    public dosis: string,
    public lote: string,
    public habilitado: boolean,
    public Desparasitacion?: Desparasitacion,
    public Medicamento?: Medicamento
  ) {}
}
