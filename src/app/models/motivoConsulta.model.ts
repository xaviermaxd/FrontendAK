import { ConsultaMedica } from './consultaMedica.model';

export class MotivoConsulta {
  constructor(
    public id: number,
    public consulta_medica_id: number,
    public descripcion: string,
    public habilitado: boolean,
    public ConsultaMedica?: ConsultaMedica,
  ) {}
}
