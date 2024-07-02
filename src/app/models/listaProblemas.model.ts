import { Sistemas } from './sistemas.model';
import { ConsultaMedica } from './consultaMedica.model';

export class ListaProblemas {
  constructor(
    public id: number,
    public consulta_medica_id: number,
    public sistema_id: number,
    public hallazgo_fisico: string,
    public observacion: string,
    public habilitado: boolean,
    public ConsultaMedica?: ConsultaMedica,
    public Sistema?: Sistemas,
  ) {}
}
