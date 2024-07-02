import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../models/turno.model';

const DAYS_MAP: { [key: number]: string } = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo'
};

@Pipe({
  name: 'filterByDay'
})
export class FilterByDayPipe implements PipeTransform {
  transform(turnos: Turno[], day: string): Turno[] {
    const dayId = Object.keys(DAYS_MAP).find(key => DAYS_MAP[+key] === day);
    if (dayId !== undefined) {
      return turnos.filter(turno => turno.HorarioID === +dayId);
    }
    return [];
  }
}
