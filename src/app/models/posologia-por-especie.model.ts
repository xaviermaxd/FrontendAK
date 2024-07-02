import { Especie } from './especie.model';
import { Medicamento } from './medicamento.model';

export class PosologiaPorEspecie {
  constructor(
    public id: number,
    public medicamento_id: number,
    public especie_id: number,
    public dosificacion: string,
    public habilitado: boolean,
    public Especie?: Especie,
    public Medicamento?: Medicamento
  ) {}
}

// export interface PosologiaPorEspecieForm {
//   especie_id: number | null;
//   dosificacion: string;
// }
