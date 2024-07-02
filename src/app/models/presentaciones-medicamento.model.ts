import { Medicamento } from './medicamento.model';
import { Presentacion } from './presentacion.model';

export class PresentacionesMedicamento {
  constructor(
    public id: number,
    public medicamento_id: number,
    public presentacion_id: number,
    public unidades: number,
    public concentracion: string,
    public habilitado: boolean,
    public Medicamento?: Medicamento,
    public Presentacion?: Presentacion
  ) {}
}

// export interface PresentacionesMedicamentoForm {
//   presentacion_id: number | null;
//   unidades: number | null;
//   concentracion: string;
// }