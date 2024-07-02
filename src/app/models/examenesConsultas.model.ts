import { ConsultaMedica } from './consultaMedica.model';
import { ExamenesMedicos } from './examenesMedicos.model';

export class ExamenesConsultas {
  constructor(
    public id: number,
    public consulta_medica_id: number,
    public examen_medico_id: number,
    public observacion: string,
    public habilitado: boolean,
    public informe?: string, // Nuevo campo
    public resultados?: string, // Nuevo campo
    public ConsultaMedica?: ConsultaMedica,
    public ExamenesMedico?: ExamenesMedicos
  ) {}
}
